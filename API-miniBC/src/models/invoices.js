'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Invoice extends Model {
		static associate(models) {
			Invoice.belongsTo(models.Account, {
				foreignKey: 'account_id',
				as: 'account',
			});

			Invoice.belongsTo(models.Institution, {
				foreignKey: 'institution_id',
				as: 'institution',
			});
		}
	}

	Invoice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			account_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('Vencida', 'Paga', 'Em aberto'),
				allowNull: false,
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			due_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			institution_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Invoice',
			tableName: 'invoices',
			underscored: true,
		}
	);

	return Invoice;
};
