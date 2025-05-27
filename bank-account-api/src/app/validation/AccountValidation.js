import Account from '../model/Account.js';

class AccountValidation {
    async accountByInstitution(user_id, number_account, institution_id){
        const accountExists = await Account.findOne({
            where: {
                user_id,
                number_account,
                institution_id
            }
        });

        return !accountExists ? false : true;
    }

    async accountByUser(user_id){
        const accountExists = await Account.findOne({
            where: {
                user_id
            }
        });

        return !accountExists ? false : true;
    }

    async accountById(id){
        const accountExists = await Account.findByPk(id);
        return !accountExists ? false : true;
    }
}

export default new AccountValidation();
