import { Op } from 'sequelize';

import User from '../model/User.js';

class UserValidation{
    async userById(id){
        const user = await User.findByPk(id);

        return !user ? false : true;
    }

    async userByEmailOrCpf(email, cpf) { 
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {cpf}
                ]
            }
        });

        return !user ? false : true;
  }
}

export default new UserValidation();
