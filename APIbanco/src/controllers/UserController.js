const { User } = require("../models");

class UserController {
    async store(req, res) {
        //Feito TryCatch para evitar que a API trave
    try {
            //Armazenar novo usuario
        const { name, email, cpf, birthdate } = req.body;

        const UserAlreadyExists = await User.findOne ({ where: {email} });
//Verificar se usuário ja existe
        if(UserAlreadyExists){
            return res.status(400).json({ message: "Este usuário já existe"});
        }
        
//Se não tiver nome e email aparece esta mensagem
if (!name || !email || !cpf || !birthdate) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const cpfExists = await User.findOne({ where: { cpf } });
if (cpfExists) {
  return res.status(400).json({ message: "CPF já cadastrado" });
}

        const createdUser = await User.create({name, email, cpf, birthdate});

        return res.status(200).json(createdUser);
        
        } catch (error) {
        console.log("Erro ao cadastrar usuário:", error);
        return res.status(400).json({message: "falha ao cadastrar ususário"});
        
        }
    }
    async index(req,res) {
        try {const users = await User.findAll();

            return res.status(200).json(users);
            
        } catch (error) {
            return res.status(400).json({message: "falha ao lista ususário"});
        }
        
    }
    async show(req, res) {
    try {
        const {id} = req.params;

        //Buscar pela primary Key
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({message: "usuario não encontrado"});

        }
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(400).json({message: "falha ao detalhar usuario"});
    }
    }
    async update(req, res) {
        try {
            const {id} = req.params;

            const { name, email, cpf, birthdate } = req.body;

            await User.update(
                { name, email, cpf, birthdate },
                { where: { id } }
              );
            return res.status(200).json({message: "usuario atualizado"});

            
        } catch (error) {
            return res.status(400).json({message: "falha ao atualizar usuario"});
        }

    }

    async destroy(req, res) {
        try {
            const {id} = req.params;

            await User.destroy(
                {
                    //registra o id que vem pelo params
                    where: {
                        id: id,
                    }
                }
            );
            return res.status(200).json({message: "usuario excluido com sucesso"});
            
            
        } catch (error) {
            return res.status(400).json({message: "falha ao excluir usuario"});
        }

    }
}

module.exports = new UserController();