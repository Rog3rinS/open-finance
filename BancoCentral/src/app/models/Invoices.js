import Sequelize, { Model } from 'sequelize';

class Invoice extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
					unique: true,
				},
				account_id: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
				status: {
					type: Sequelize.ENUM('Vencida', 'Paga', 'Em aberto'),
					allowNull: false,
				},
				amount: {
					type: Sequelize.FLOAT,
					allowNull: false,
				},
				description: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				due_date: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				institution_id: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
			},
			{
				sequelize,
				underscored: true,
				tableName: 'invoices',
				timestamps: true, // auto-manages created_at and updated_at
			}
		);

		return this;
	}
};

export default Invoice;
