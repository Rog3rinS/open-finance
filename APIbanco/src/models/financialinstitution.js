'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialInstitution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinancialInstitution.init({
    name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    trade_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinancialInstitution',
  });
  return FinancialInstitution;
};