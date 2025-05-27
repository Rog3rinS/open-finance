import { promisify } from 'util';

import jwt from 'jsonwebtoken';

import auth from '../../config/auth.js';

export default async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({ error: 'Token not exists!' });
    }

    const [ , token] = authHeader.split(' ');

    try {

    await promisify(jwt.verify)(token, auth.secret);

    return next();

    } catch(error) {
        console.log(error);
        return response.status(400).json({ error: error.message });
    }
}
