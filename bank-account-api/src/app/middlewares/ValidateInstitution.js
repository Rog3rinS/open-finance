import * as Yup from 'yup';

class ValidateInstitution {
    async validateBodyPost(request, response, next){
        const schema = Yup.object().shape({
            name: Yup.string().required().min(2),
            phone: Yup.string().required(),
            cnpj: Yup.string().required(),
            email: Yup.string().email().required()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'Invalid body!'});
        }

        return next();

    }
}

export default new ValidateInstitution();
