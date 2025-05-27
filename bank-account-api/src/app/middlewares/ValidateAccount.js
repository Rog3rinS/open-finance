import * as Yup from 'yup';

class ValidateAccount {
    async validateBodyPost(request, response, next){
        const schema = Yup.object().shape({
            institution_id: Yup.number().required(),
            balance: Yup.number().required()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'Invalid body!'});
        }

        return next();
    }
}

export default new ValidateAccount();
