module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
      type: {
        type: DataTypes.ENUM("deposit", "withdraw"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });
    };
  
    return Transaction;
  };
  