import Sequelize, { Model } from 'sequelize';

class Institution extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				cnpj: Sequelize.STRING,
				email: Sequelize.STRING,
				phone: Sequelize.STRING
			},
			{
				sequelize
			}
		);

		return this;
	}
}

export default Institution;
