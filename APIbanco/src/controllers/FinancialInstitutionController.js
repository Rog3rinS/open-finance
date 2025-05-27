const { FinancialInstitution } = require("../models");

class FinancialInstitutionController {
  async store(req, res) {
    try {
      const { name, cnpj, trade_name } = req.body;

      if (!name || !cnpj || !trade_name) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const exists = await FinancialInstitution.findOne({ where: { cnpj } });
      if (exists) {
        return res.status(400).json({ message: "CNPJ já cadastrado." });
      }

      const institution = await FinancialInstitution.create({ name, cnpj, trade_name });
      return res.status(201).json(institution);

    } catch (error) {
      console.error("Erro ao cadastrar instituição:", error);
      return res.status(500).json({ message: "Erro interno ao cadastrar." });
    }
  }

  async index(req, res) {
    try {
      const institutions = await FinancialInstitution.findAll();
      return res.status(200).json(institutions);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar instituições." });
    }
  }

async show(req, res) {
  try {
    const { id } = req.params;
    const institution = await FinancialInstitution.findByPk(id);

    if (!institution) {
      return res.status(404).json({ message: "Instituição não encontrada" });
    }

    return res.status(200).json(institution);
  } catch (error) {
    console.log("Erro ao buscar instituição:", error);
    return res.status(400).json({ message: "Falha ao buscar instituição" });
  }
}

}

module.exports = new FinancialInstitutionController();
