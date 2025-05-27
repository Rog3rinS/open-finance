'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'TEMPORARIO123'
    });

    await queryInterface.addColumn('Users', 'birthdate', {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal("'2000-01-01'")
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'cpf');
    await queryInterface.removeColumn('Users', 'birthdate');
  }
};
