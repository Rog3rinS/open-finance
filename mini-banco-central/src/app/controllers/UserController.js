import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string().required('CPF é obrigatório'),  
            name: Yup.string().required('Nome é obrigatório'),
            email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
            password: Yup.string()
                .required('Senha é obrigatória')
                .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        const userExistsByCpf = await User.findOne({ where: { cpf: req.body.cpf } });
        if (userExistsByCpf) {
            return res.status(400).json({ error: 'CPF já está em uso.' });
        }

        const userExistsByEmail = await User.findOne({ where: { email: req.body.email } });
        if (userExistsByEmail) {
            return res.status(400).json({ error: 'E-mail já está em uso.' });
        }

        
        const { cpf, name, email } = await User.create(req.body);

        return res.json({
            cpf,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string(),
            name: Yup.string(),
            email: Yup.string().email('E-mail inválido'),
            oldPassword: Yup.string().min(6, 'A senha antiga deve ter no mínimo 6 caracteres'),
            password: Yup.string()
                .min(6, 'A nova senha deve ter no mínimo 6 caracteres')
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')], 'As senhas não coincidem') : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userCpf);
        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });
            if (userExists) {
                return res.status(400).json({ error: 'E-mail já está em uso.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const { cpf, name } = await user.update(req.body);

        return res.json({
            cpf,
            name,
            email,
        });
    }

    async index(req, res){
        const users = await User.findAll({
            where: { cpf: req.userCpf },
        });
        return res.json(users);
    }

    async delete(req, res) {
        const { user_cpf } = req.params;
    
        const schema = Yup.object().shape({
            user_cpf: Yup.string().required('CPF é obrigatório')
        });
    
        if (!(await schema.isValid({ user_cpf }))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }
    
        const user = await User.findOne({ where: { cpf: user_cpf } });
    
        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe ou CPF incorreto' });
        }
    
        if (user_cpf !== req.userCpf) {
            return res.status(401).json({ error: 'Requisição não autorizada' });
        }
    
        await user.destroy();
    
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    
}

export default new UserController();
