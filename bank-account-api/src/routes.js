import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import InstitutionController from './app/controllers/InstitutionController.js';
import AccountController from './app/controllers/AccountController.js';
import TransactionController from './app/controllers/TransactionController.js';
import SessionController from './app/controllers/SessionController.js';
import auth from './app/middlewares/auth.js';
import ValidateUser from './app/middlewares/ValidateUser.js';
import ValidateSession from './app/middlewares/ValidateSession.js';
import ValidateInstitution from './app/middlewares/ValidateInstitution.js';
import ValidateAccount from './app/middlewares/ValidateAccount.js';
import ValidateTransaction from './app/middlewares/ValidateTransaction.js';

const routes = new Router();

routes.post('/users', ValidateUser.validateBodyPost, UserController.store);
routes.post('/sessions', ValidateSession.validateBodyPost, SessionController.store);
routes.post('/institutions', ValidateInstitution.validateBodyPost, InstitutionController.store);
routes.post('/users/:id/accounts', ValidateAccount.validateBodyPost, AccountController.store);
routes.post('/users/:id/transactions', ValidateTransaction.validateBodyPost, TransactionController.store);

routes.get('/users', UserController.index);
routes.get('/institutions', InstitutionController.index);
routes.get('/accounts', AccountController.index);
routes.get('/users/:id/accounts', AccountController.show);
routes.get('/users/:id/balance', UserController.show);
routes.get('/users/:id/statement', UserController.showStatement);

routes.use(auth);
routes.put('/users/:id', ValidateUser.validateBodyPut, UserController.update);

export default routes;
