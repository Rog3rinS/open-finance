import * as Yup from 'yup';
import Invoice from '../models/invoice.js';
import Account from '../models/account.js';
import Institution from '../models/institution.js';

class InvoicesController {
	async store(req, res) {
		const schema = Yup.object().shape({
			account_id: Yup.number()
				.integer('O ID da conta deve ser um número inteiro.')
				.required('O ID da conta é obrigatório.'),
			status: Yup.string()
				.oneOf(["Vencida", "Paga", "Em aberto"], 'Status inválido. Use "Vencida", "Paga" ou "Em aberto".')
				.required('O status é obrigatório.'),
			amount: Yup.number()
				.positive('O valor deve ser positivo.')
				.required('O valor é obrigatório.'),
			description: Yup.string().nullable(),
			due_date: Yup.date()
				.typeError('A data de vencimento deve ser uma data válida.')
				.required('A data de vencimento é obrigatória.'),
			institution_id: Yup.number()
				.integer('O ID da instituição deve ser um número inteiro.')
				.required('O ID da instituição é obrigatório.'),
		});

		try {
			await schema.validate(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: 'Falha na validação.', messages: err.errors });
		}

		const {
			account_id,
			status,
			amount,
			description,
			due_date,
			institution_id,
		} = req.body;

		try {
			const accountExists = await Account.findByPk(account_id);
			if (!accountExists) {
				return res.status(400).json({ error: 'Conta não encontrada para o ID fornecido.' });
			}

			const institutionExists = await Institution.findByPk(institution_id);
			if (!institutionExists) {
				return res.status(400).json({ error: 'Instituição não encontrada para o ID fornecido.' });
			}

			const invoice = await Invoice.create({
				account_id,
				status,
				amount,
				description,
				due_date,
				institution_id,
			});

			return res.status(201).json(invoice);

		} catch (error) {
			console.error("Erro ao criar fatura:", error);
			return res.status(500).json({ error: 'Erro interno do servidor ao tentar criar a fatura.' });
		}
	}
}

export default new InvoicesController();
