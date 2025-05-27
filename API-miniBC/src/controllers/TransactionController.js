import * as Yup from 'yup';
import { Op } from "sequelize";
import Transaction from '../models/transaction';
import Account from '../models/account';
import User from '../models/user';
import Institution from '../models/institution';

class TransactionController {
	async index(req, res) {
		const institution = req.query.instituicao;

		if (institution) {
			const instituicao = await Institution.findOne({
				where: { name: req.query.instituicao },
			});

			if (!instituicao) {
				return res.status(400).json({ error: 'Instituicao nao encontrada.' });
			}

			const account = await Account.findOne({
				where: {
					cpf: req.params.cpf,
					institution_id: instituicao.id,
				},
			});

			if (!account) {
				return res.status(400).json({ error: 'Conta nao existe.' });
			}

			const transaction = await Transaction.findAll({
				where: {
					[Op.or]: [ //pegando as transacoes que o id e origin ou destination
						{ origin_account_id: account.id },
						{ destination_account_id: account.id },
					],
				},
				order: [["created_at", "DESC"]],
			});

			const response = [];

			for (const tx of transaction) {
				const originAccount = await Account.findByPk(tx.origin_account_id);
				if (!originAccount) {
					console.log(`Conta com o origin id ${tx.origin_account_id} nao encontrada.`);
					continue;
				}

				const originUser = await User.findOne({ where: { cpf: originAccount.cpf } });
				const originInstitution = await Institution.findByPk(originAccount.institution_id);

				let destinationAccount = null;
				let destinationUser = null;
				let destinationInstitution = null;

				if (tx.destination_account_id) {
					destinationAccount = await Account.findByPk(tx.destination_account_id);

					if (destinationAccount) {
						destinationUser = await User.findOne({ where: { cpf: destinationAccount.cpf } });
						destinationInstitution = await Institution.findByPk(destinationAccount.institution_id);
					}
				}

				response.push({
					transference_id: tx.id,
					tipo: tx.type,
					valor: tx.amount,
					data: tx.created_at,
					movimentacao: tx.origin_account_id === account.id ? "saida" : "entrada",
					origin: {
						name: originUser?.name || "Origin user nao encontrado",
						cpf: originUser?.cpf || "Nao foi encontrado o CPF",
						institution: originInstitution?.name || "Nao foi encontrada a Instituição",
					},
					destination: tx.type === "transferencia" && destinationUser
						? {
							name: destinationUser.name,
							cpf: destinationUser.cpf,
							institution: destinationInstitution?.name || "Nao foi possível encontrar a instituicao",
						}
						: null,
				});
			}
			return res.json(response);
		}
		else {
			const accounts = await Account.findOne({
				where: {
					cpf: req.params.cpf,
				},
			});

			if (!accounts) {
				return res.status(400).json({ error: 'Conta nao encontrada.' });
			}

			const transaction = await Transaction.findAll({
				where: {
					[Op.or]: [
						{ origin_account_id: accounts.id },
						{ destination_account_id: accounts.id },
					],
				},
				order: [["created_at", "DESC"]],
			});

			const response = [];

			for (const tx of transaction) {
				const originAccount = await Account.findByPk(tx.origin_account_id);
				if (!originAccount) {
					console.log(`Conta com o origin id ${tx.origin_account_id} nao encontrada.`);
					continue;
				}

				const originUser = await User.findOne({ where: { cpf: originAccount.cpf } });
				const originInstitution = await Institution.findByPk(originAccount.institution_id);

				let destinationAccount = null;
				let destinationUser = null;
				let destinationInstitution = null;

				if (tx.destination_account_id) {
					destinationAccount = await Account.findByPk(tx.destination_account_id);

					if (destinationAccount) {
						destinationUser = await User.findOne({ where: { cpf: destinationAccount.cpf } });
						destinationInstitution = await Institution.findByPk(destinationAccount.institution_id);
					}
				}

				response.push({
					transference_id: tx.id,
					tipo: tx.type,
					valor: tx.amount,
					data: tx.created_at,
					movimentacao: tx.origin_account_id === account.id ? 'saida' : 'entrada',
					origin: {
						name: originUser?.name || 'Origin user nao encontrado',
						cpf: originUser?.cpf || 'Nao foi possível encontrar esse CPF',
						institution: originInstitution?.name || 'Instituicao nao encontrada',
					},
					destination: tx.type === 'transferencia' && destinationUser
						? {
							name: destinationUser.name,
							cpf: destinationUser.cpf,
							institution: destinationInstitution?.name || 'Instituicao nao encontrada',
						}
						: null,
				});
			}

			return res.json(response);
		}
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			type: Yup.string().oneOf(["deposito", "saque", "transferencia"]).required(),
			amount: Yup.number().positive().required(),
			destination_cpf: Yup.string().min(11).max(11),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Falha na validacao.' });
		}

		const { type, amount, destination_cpf } = req.body;
		const origin_cpf = req.params.cpf;

		console.log(origin_cpf);

		if (type == "transferencia" && !destination_cpf) {
			return res.status(400).json({ error: 'Obrigatório informar o CPF do destino' });
		}

		// Verificando se a conta de origem existe
		const originAccount = await Account.findOne({
			where: { cpf: origin_cpf }
		});

		if (!originAccount) {
			return res.status(400).json({ error: 'Conta de origem nao existe.' });
		}

		// Verificando se e handling errors em caso de transferencia
		let destinationAccount = null;

		if (type === "transferencia") {
			destinationAccount = await Account.findOne({ where: { cpf: destination_cpf } });

			if (!destinationAccount) {
				return res.status(404).json({ error: 'Conta de destino nao encontrada.' });
			}

			if (origin_cpf === destination_cpf) {
				return res.status(400).json({ error: 'Transferência para a mesma conta nao e permitida.' });
			}
		}

		if ((type === "saque" || type === "transferencia") && originAccount.balance < amount) {
			return res.status(400).json({ error: 'Saldo insuficiente.' });
		}

		// Handling de saldos
		if (type === "saque") {
			originAccount.balance -= amount;
			await originAccount.save(); //valida a alteracao no banco de dados
		}
		else if (type === "deposito") {
			originAccount.balance += amount;
			await originAccount.save();
		}
		else if (type === "transferencia") {
			originAccount.balance -= amount;
			destinationAccount.balance += amount;
			await originAccount.save();
			await destinationAccount.save();
		}

		try {
			const transaction = await Transaction.create({
				type,
				amount,
				origin_account_id: originAccount.id,
				destination_account_id: destinationAccount ? destinationAccount.id : null,
				instituiton_id: originAccount.institution_id,
			});

			const fullTransaction = await Transaction.findByPk(transaction.id, {
				include: {
					model: Account,
					as: "origin_account",
					include: {
						model: Institution,
						as: "institution",
						attributes: ["name"],
					},
				},
			});

			//shit got so messy, i needed to build a response
			const response = {
				id: fullTransaction.id,
				type: fullTransaction.type,
				amount: fullTransaction.amount,
				createdAt: fullTransaction.createdAt,
				origin_account_id: fullTransaction.origin_account_id,
				destination_account_id: fullTransaction.destination_account_id,
				origin_account: {
					cpf: fullTransaction.origin_account.cpf,
					institution: {
						name: fullTransaction.origin_account.institution.name,
					},
				},
			};
			return res.status(201).json(response);
		} catch (err) {
			console.error('Transaction creation error:', err);
			return res.status(400).json({ error: 'Failed to create transaction.' });
		}
	}
}
 
export default new TransactionController();