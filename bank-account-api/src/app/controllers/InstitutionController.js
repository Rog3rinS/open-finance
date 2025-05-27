import InstitutionUseCase from '../usecases/InstitutionUseCase.js';

class InstitutionController {
    async index(request, response){
        const institutions = await InstitutionUseCase.findAll();
        return response.send(institutions);
    }

    async store(request, response){
        const {name, phone, cnpj, email} = request.body;

        const institutionSavedOrError = await InstitutionUseCase.save({
            name,
            phone,
            cnpj,
            email
        })

        return response.send(institutionSavedOrError);
    }
}

export default new InstitutionController();
