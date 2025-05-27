import AccountUseCase from '../usecases/AccountUseCase.js';

class AccountController {
    async index(request, response){
        const accounts = AccountUseCase.findAll();

        return response.send(accounts);
    }

    async store(request, response){
        try{
            const { id: user_id } = request.params;
            const {institution_id, balance} = request.body;

            const accountSaved = await AccountUseCase.save({
                user_id,
                institution_id,
                balance
            });

            return response.send(accountSaved);
        }catch(error){
            return response.status(400).json({ error: error.message});
        }

    }

    async show(request, response){
        const { id: user_id } = request.params;

        try{

            const accounts = await AccountUseCase.findById(user_id);

            return response.send(accounts);

        }catch(error){
            return response.status(400).json({ error: error.message});
        }

    }
}

export default new AccountController();
