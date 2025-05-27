'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Account.belongsTo(models.FinancialInstitution, {
        foreignKey: 'financial_institution_id',
        as: 'financialInstitution'
      });
    }
  }
  Account.init({
    user_id: DataTypes.INTEGER,
    financial_institution_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
