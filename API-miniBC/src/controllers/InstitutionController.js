import Institution from '../models/institution';
import * as Yup from 'yup';

class InstitutionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			type: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Houve uma falha na validacao.' });
		};

		const institutionExists = await Institution.findOne({
			where: { name: req.body.name.toLowerCase() },
		})

		if (institutionExists) {
			return res.status(400).json({ error: 'Instituicao ja existente.' });
		}
 
		const institution = await Institution.create({
			name: req.body.name.toLowerCase(),
			type: req.body.type.toLowerCase(),
		});

		return res.status(201).json(institution);
	}

	async delete(req, res) {
		const { id } = req.params;

		const institution = await Institution.findByPk(id);

		if (!institution) {
			return res.status(404).json({ error: "Instituicao nao encontrada" });
		}

		await institution.destroy();

		return res.status(204).send();
	}
}

export default new InstitutionController();