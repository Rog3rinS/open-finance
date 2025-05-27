import * as Yup from 'yup';

class ValidateUser {
    async validateBodyPost(request, response, next){
        const schema = Yup.object().shape({
            cpf: Yup.string().required(),
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'Invalid body!'});
        }

        return next();
    }

    async validateBodyPut(request, response, next){
        const schema = Yup.object().shape({
            cpf: Yup.string().required(),
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
        })

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'Invalid body!'});
        }

        return next();

    }
}

export default new ValidateUser();
