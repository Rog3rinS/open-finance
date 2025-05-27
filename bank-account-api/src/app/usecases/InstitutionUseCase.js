import Institution from '../model/Institution.js';
import InstitutionValidation from '../validation/InstitutionValidation.js';

class InstitutionUseCase {
    async findAll(){
        const institutions = await Institution.findAll();
        return institutions;
    }

    async save(data){
        if(!(await InstitutionValidation.isValid(data))){
            return {error: 'Institution not valid!'};
        }

        const institution = await Institution.create(data);
        return institution;
    }
}

export default new InstitutionUseCase();
