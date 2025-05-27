import { Router } from 'express';
import InstitutionController from './controllers/InstitutionController.js';
import UserController from './controllers/UserController.js';
import AccountController from './controllers/AccountController.js';
import TransactionController from './controllers/TransactionController.js';

const routes = new Router();

//rotas de Institutions
routes.post('/instituicao', InstitutionController.store); // rota para criar as instituições
routes.delete('/instituicao/:id', InstitutionController.delete); // rota para deletar instituições

//rotas de Users
routes.get('/usuarios/:cpf', UserController.index); // rota para bucar usuario pelo CPF
routes.post('/usuarios', UserController.store); // rota para criar usuario
routes.put('/usuarios/:cpf', UserController.update); // rota para atualizar infos
routes.delete('/usuarios/:cpf', UserController.delete); // rota para deletar usuario 

//rotas de Accounts
routes.post('/usuarios/:cpf/contas', AccountController.store); // rota para 
routes.get('/usuarios/:cpf/contas', AccountController.index);   // 

//rotas de Transactions
routes.post('/usuarios/:cpf/transacoes', TransactionController.store); // 
routes.get('/usuarios/:cpf/extrato', TransactionController.index); //

//Balanço 
routes.get('/usuarios/:cpf/saldo', UserController.getBalance); // 

export default routes;