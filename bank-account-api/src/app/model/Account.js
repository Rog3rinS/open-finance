import Sequelize, { Model } from 'sequelize';

class Account extends Model {
	static init(sequelize) {
		super.init(
			{
				number_account: Sequelize.STRING,
				balance: Sequelize.FLOAT,
			},
			{ sequelize }
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.Institution, { foreignKey: 'institution_id', as: 'institution' });
	}
}

export default Account;
