import Account from '../model/Account.js';
import User from '../model/User.js';
import UserValidation from '../validation/UserValidation.js';
import InstitutionValidation from '../validation/InstitutionValidation.js';
import Institution from '../model/Institution.js';
import AccountValidation from '../validation/AccountValidation.js';
import Transaction from '../model/Transaction.js';

class UserUseCase {
    async findAll(){
        return await User.findAll({
            attributes: ['id', 'name', 'email', 'cpf']
        });
    }

    async save(data){
        const existsUser = await UserValidation.userByEmailOrCpf(data.email, data.cpf);

        if(existsUser){
            return {error: 'User exists!'};
        }

        const {id, name, email, cpf} = await User.create(data);
        return { id ,name, email, cpf};
    }

    async replace(data){
        if(!(await UserValidation.userById(data.id))){
            return {error: 'Not exists user with this id!'};
        }

        const existsUser = await UserValidation.userByEmailOrCpf(data.email, data.cpf);
        if(existsUser){
            return {error: 'User exists!'};
        }

        const user = await User.findByPk(data.id);

        user.name = data.name;
        user.email = data.email;
        user.cpf = data.cpf;

        console.log(user);

        const { name, email, cpf } = await user.save();

        return {name, email, cpf};
    }

    async totalBalance(user_id){
        if(!(await AccountValidation.accountByUser(user_id))){
            throw new Error('Not exists account this user!');
        }

        const accounts = await Account.findAll({where: {
            user_id
        }})

        const balances = accounts.map(account => account.balance);
        const totalBalance = balances.reduce((acc, balance) => acc + balance, 0);

        const {name, cpf } = await User.findByPk(user_id);

        return {
            name,
            cpf,
            totalBalance
        }
    }

    async totalBalanceByInstitution(user_id, institution){
        if(!(await InstitutionValidation.institutionByName(institution))){
            throw new Error('Institution not exits!');
        }

        const institutionSaved = await Institution.findOne({where:{name:institution}});

        const accounts = await Account.findAll({
            where: {
                user_id,
                institution_id: institutionSaved.id
            }
        });

        if(!accounts){
            throw new Error('Not exists account this user!');
        }

        const balances = accounts.map(account => account.balance);
        const totalBalance = balances.reduce((acc, balance) => acc + balance, 0);

        const {name, cpf } = await User.findByPk(user_id);

        return {
            name,
            cpf,
            totalBalance
        }
    }

    async findTransactions(user_id){
        if(!(await AccountValidation.accountByUser(user_id))){
            throw new Error('Not exists account this user!');
        }

        const transactions = await Transaction.findAll({
            include: {
                model: Account,
                as: 'account',
                where: {
                    user_id
                },
                attributes: ['institution_id', 'number_account']
            }
        });

        return transactions;
    }

    async findTransactionsByInstitution(user_id, nameInstitution){
        if(!(await InstitutionValidation.institutionByName(nameInstitution))){
            throw new Error('Not exits this institution');
        }

        if(!(await AccountValidation.accountByUser(user_id))){
            throw new Error('Not exists account this user!');
        }

        const { id: institution_id } = await Institution.findOne({
            where: {
                name: nameInstitution
            }
        });

        const transactions = await Transaction.findAll({
            include: {
                model: Account,
                as: 'account',
                where: {
                    user_id,
                    institution_id
                },
                attributes: ['institution_id', 'number_account']
            }
        });

        return transactions;
    }

    async findTransactionsByType(user_id, type){
        if(!(await AccountValidation.accountByUser(user_id))){
            throw new Error('Not exists account this user!');
        }

        const transactions = await Transaction.findAll({
            where: { type }
        });

        return transactions;
    }

    async findTransactionsByInstitutionAndType(user_id, nameInstitution, type){
        if(!(await InstitutionValidation.institutionByName(nameInstitution))){
            throw new Error('Not exits this institution!');
        }

        if(!(await AccountValidation.accountByUser(user_id))){
            throw new Error('Not exists account this user!');
        }

        const { id: institution_id } = await Institution.findOne({
            where: {
                name: nameInstitution
            }
        });

        const transactions = await Transaction.findAll({
            where: {
                type
            },
            include: {
                model: Account,
                as: 'account',
                where: {
                    user_id,
                    institution_id
                },
                attributes: ['institution_id', 'number_account']
            }
        });

        return transactions;
    }
}

export default new UserUseCase();
