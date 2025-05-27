const { Account, User, FinancialInstitution } = require("../models");

class AccountController {
  async store(req, res) {
    try {
      const { user_id, financial_institution_id, balance } = req.body;

      const user = await User.findByPk(user_id);
      const institution = await FinancialInstitution.findByPk(financial_institution_id);

      if (!user || !institution) {
        return res.status(400).json({ message: "Usuário ou Instituição não encontrada." });
      }

      const account = await Account.create({ user_id, financial_institution_id, balance });
      return res.status(201).json(account);

    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return res.status(500).json({ message: "Erro ao criar conta" });
    }
  }

  async index(req, res) {
    try {
      const accounts = await Account.findAll({ include: ['user', 'financialInstitution'] });
      return res.status(200).json(accounts);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar contas" });
    }
  }
}

module.exports = new AccountController();
