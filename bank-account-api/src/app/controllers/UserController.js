import UserUseCase from '../usecases/UserUseCase.js';

class UserController{

    async index(request, response){
        const users = await UserUseCase.findAll();

        return response.send(users);
    }
    async store(request, response){
        const body = request.body;
        const userSaved = await UserUseCase.save(body);
        return response.send(userSaved);
    }

    async update(request, response){
        const { id } = request.params;
        const {name, email, cpf} = request.body;

        const userUpdatedOrError = await UserUseCase.replace({id, name, email, cpf});
        return response.send(userUpdatedOrError);
    }

    async show(request, response){
        const { id } = request.params;
        const { institution } = request.query;

        try{

            if(!institution){
                const data = await UserUseCase.totalBalance(id, institution);
                return response.send(data);
            }

            const data = await UserUseCase.totalBalanceByInstitution(id, institution);
            return response.send(data);

        }catch(error){
            return response.status(400).json({error: error.message});
        }
    }

    async showStatement(request, response){
        const { id } = request.params;
        const { institution } = request.query;
        const { type } = request.query;

        try{

            if(!institution && !type){
                const transactions = await UserUseCase.findTransactions(id);
                return response.send(transactions);
            }

            if(!type && institution){
                const transactions = await UserUseCase.findTransactionsByInstitution(id, institution);
                return response.send(transactions);
            }

            if(type && !institution){
                const transactions = await UserUseCase.findTransactionsByType(id, type);
                return response.send(transactions);
            }

            const transactions = await UserUseCase.findTransactionsByInstitutionAndType(id, institution, type);
            return response.send(transactions);

        }catch(error){
            return response.status(400).json({error: error.message});
        }
    }
}

export default new UserController();
