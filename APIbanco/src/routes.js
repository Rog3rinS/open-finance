const express = require("express");
const routes = express.Router();  // Usar apenas uma vez e manter o nome 'routes'

const UserController = require("./controllers/UserController");
const FinancialInstitutionController = require("./controllers/FinancialInstitutionController");
const AccountController = require("./controllers/AccountController");
const TransactionController = require('./controllers/TransactionController');

// Rota de verificação
routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

// Rotas de transações
routes.post("/accounts/:accountId/transactions", TransactionController.store);
routes.get("/accounts/:accountId/transactions", TransactionController.index);

// Rotas de usuários
routes.post("/users", UserController.store);
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

// Rotas de instituições financeiras
routes.post("/institutions", FinancialInstitutionController.store);
routes.get("/institutions", FinancialInstitutionController.index);
routes.get("/institutions/:id", FinancialInstitutionController.show);

// Rotas de contas
routes.post("/accounts", AccountController.store);
routes.get("/accounts", AccountController.index);

module.exports = routes;
