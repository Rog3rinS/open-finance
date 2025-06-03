import * as Yup from 'yup';
import Bank from '../models/Bank';

class BankController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cnpj: Yup.string().required('CNPJ é obrigatório'),
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      phone: Yup.string().required('Telefone é obrigatório'),
      address: Yup.string().required('Endereço é obrigatório'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { cnpj, email } = req.body;

    const bankExists = await Bank.findOne({
      where: { cnpj },
    });

    if (bankExists) {
      return res.status(400).json({ error: 'Banco com esse CNPJ já existe' });
    }

    const emailExists = await Bank.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Banco com esse e-mail já existe' });
    }

    const bank = await Bank.create(req.body);

    return res.status(201).json(bank);
  }

  async update(req, res) {
    const { cnpj } = req.params; 
    const { name, email, phone, address } = req.body;

    const bank = await Bank.findOne({
      where: { cnpj },
    });

    if (!bank) {
      return res.status(404).json({ error: 'Banco não encontrado' });
    }


    bank.name = name;
    bank.email = email;
    bank.phone = phone;
    bank.address = address;

    await bank.save();

    return res.json(bank);
  }

  async index(req, res) {
    const banks = await Bank.findAll();
    return res.json(banks);
  }

  async delete(req, res) {
    const { cnpj } = req.params; 

    const bank = await Bank.findOne({
      where: { cnpj },
    });

    if (!bank) {
      return res.status(404).json({ error: 'Banco não encontrado' });
    }

    await bank.destroy();

    return res.status(204).send(); 
  }
}

export default new BankController();


