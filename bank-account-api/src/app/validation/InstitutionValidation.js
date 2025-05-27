import { Op } from "sequelize";

import Institution from '../model/Institution.js';

class InstitutionValidation {
    async institutionById(id){
        const institution = await Institution.findByPk(id);

        return !institution ? false : true;
    }

    async isValid(body){
        const institution = await Institution.findOne({
            where: {
                [Op.or]: [
                    {name: body.name},
                    {cnpj: body.cnpj},
                    {email: body.email},
                    {phone: body.phone}
                ]
            }
        });

        return !institution ? true : false;
    }

    async institutionByName(name){
        const institution = await Institution.findOne({
            where: {
                name
            }
        });

        return !institution ? false : true;
    }
}

export default new InstitutionValidation();
