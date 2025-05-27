import Account from '../model/Account.js';
import Transaction from '../model/Transaction.js';
import AccountValidation from '../validation/AccountValidation.js';
import TransactionValidation from '../validation/TransactionValidation.js';

class TransactionUseCase {
    async save(data){
        if(!(await AccountValidation.accountByUser(data.user_id))){
            throw new Error('Account does not exists for this user!');
        }

        let transactionSaved;

        switch (data.type){
            case 'debit':
                if(!(await TransactionValidation.isValidBalance(data.account_id, data.amount))){
                    throw new Error('Insufficient balance!');
                }

                transactionSaved = await this.#persistAccount(data);
                await this.#updateBalanceAccountTypeDebit(transactionSaved.account_id, transactionSaved.amount);
                return transactionSaved;

            case 'credit':
                transactionSaved = await this.#persistAccount(data);
                await this.#updateBalanceAccountTypeCredit(transactionSaved.account_id, transactionSaved.amount);
                return transactionSaved;

            default:
                throw new Error('Type of transactions not exists!');
        }
    }


    async #persistAccount(data){
        data.amount = parseFloat(data.amount);

        const account = await Transaction.create({
            amount: data.amount,
            type: data.type,
            description: data.description,
            account_id: data.account_id
        });

        return account;

    }

    async #updateBalanceAccountTypeDebit(account_id, amount){
        const account = await Account.findByPk(account_id);
        account.balance -= amount;
        await account.save();
    }

    async #updateBalanceAccountTypeCredit(account_id, amount){
        const account = await Account.findByPk(account_id);
        account.balance += amount;
        account.save();

    }
}

export default new TransactionUseCase();
