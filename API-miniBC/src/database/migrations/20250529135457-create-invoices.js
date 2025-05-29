module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("invoices", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        references: { model: "accounts", key: "id" },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("Vencida", "Paga", "Em aberto"),
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
        references: { model: "institutions", key: "id" },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable("invoices");
  },
};
