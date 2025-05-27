import * as Yup from 'yup';
import Institution from '../models/institution';
import Account from '../models/account';

class AccountController {
	async index(req, res) {
		const institution = req.query.instituicao;

		if (!institution) {
			return res.status(400).json({ error: 'Parametro "intituicao": é obrigatorio.' });
		}

		const instituicao = await Institution.findOne({
			where: { name: req.query.instituicao },
		});

		if (!instituicao) {
			return res.status(400).json({ error: 'Instituicao nao encontrada.' });
		}
		const account = await Account.findAll({
			where: {
				cpf: req.params.cpf,
				institution_id: instituicao.id,
			}
		})

		if (account.length === 0) {
			return res.status(400).json({ error: 'A conta nao existe.' });
		}

		return res.json(account);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			institution_name: Yup.string().required(),
			type: Yup.string().required(),
		});

		const cpf = req.params.cpf;

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Falha na validacao.' });
		}

		const { institution_name, type } = req.body;

		const institution = await Institution.findOne({
			where: { name: institution_name.toLowerCase() },
		});


		if (!institution) {
			return res.status(400).json({ error: 'Instituicao nao encontrada.' });
		}

		const accountExist = await Account.findOne({
			where: {
				cpf,
				institution_id: institution.id,
			},
		});

		if (accountExist) {
			return res.status(400).json({ error: 'Conta ja existente' });
		}
 
		const account = await Account.create({
			cpf,
			institution_id: institution.id,
			type,
			balance: 0,
		});

		return res.status(201).json(account);
	}
}

export default new AccountController();