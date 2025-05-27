import Account from '../model/Account.js';
import AccountValidation from '../validation/AccountValidation.js';
import UserValidation from '../validation/UserValidation.js';
import InstitutionValidation from '../validation/InstitutionValidation.js';

class AccountUseCase {
    async findAll(){
        const accounts = await Account.findAll();
        return accounts;
    }

    async save(data){
        const number_account = (Math.floor(100000 + Math.random() * 900000)).toString();
        const institution_id = data.institution_id;
        const user_id = parseInt(data.user_id);

        if(!(await UserValidation.userById(user_id))){
            throw new Error('User not exists!');
        }

        if(!(await InstitutionValidation.institutionById(institution_id))){
            throw new Error("Institution not exists!");
        }

        if(await AccountValidation.accountByInstitution(user_id, number_account, institution_id)){
            throw new Error('Exists account this institution!');
        }

        const account = {
            balance: data.balance,
            user_id,
            institution_id,
            number_account,
        }
        console.log(account);

        const accountSaved = await Account.create(account);
        return accountSaved;
    }

    async findById(user_id){
        if(!(await UserValidation.userById(user_id))){
            throw new Error('User not exists!');
        }

        const accounts = await Account.findAll({
            where: {user_id}
        });

        return accounts;
    }
}

export default new AccountUseCase();
