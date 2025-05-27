import jwt from 'jsonwebtoken';

import User from '../model/User.js';
import auth from '../../config/auth.js';

class SessionController {
    async store(request, response){
        const {email, password} = request.body;

        const user = await User.findOne({
            where: { email }
        });

        if(!user){
            return response.status(404).json('User not exists!');
        }

        if(!(await user.checkPassword(password))){
            return response.status(401).json('Password invalid!');
        }

        const { id, name} = user;

        return response.json({
            user: {
                id,
                name
            },
            token: jwt.sign({id}, auth.secret, {
                expiresIn: auth.expiresIn
            })
        });
    }
}

export default new SessionController();
