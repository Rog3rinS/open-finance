import { Router } from 'express';

import authMiddlewares from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BankController from './app/controllers/BankController';
import AccountController from './app/controllers/AccountController';
import TransactionController from './app/controllers/TransactionController';

const routes = new Router();


routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/banks', BankController.store);


routes.put('/banks/:cnpj', BankController.update);
routes.get('/banks', BankController.index);
routes.delete('/banks/:cnpj', BankController.delete);


routes.post('/transactions', TransactionController.store);
routes.put('/transactions/:id', TransactionController.update);


routes.use(authMiddlewares);


routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.delete('/users/:user_cpf', UserController.delete);

routes.post('/accounts', AccountController.store);
routes.get('/accounts', AccountController.index); 
routes.put('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.delete);




export default routes;
