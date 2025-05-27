import TransactionUseCase from '../usecases/TransactionUseCase.js';

class TransactionController {
    async store(request, response){

        const { id: user_id } = request.params;
        const{ account_id, amount, type, description} = request.body;

        try{
            const transactionSaved = await TransactionUseCase.save({
                user_id,
                account_id,
                amount,
                type,
                description
            });

            return response.send(transactionSaved);

        }catch(error){
            return response.status(400).json({error: error.message});
        }
    }
}

export default new TransactionController();
