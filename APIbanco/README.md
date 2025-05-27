# Desafio APIbanco
### Feito com JavaScript
<p>
Bom dia, aqui esta o repo referente a ativididade API Agregadora de Contas, os códigos estão em JS, foram feias algumas configurações e installs para rodar 100% a API, abaixo algumas instruções sobre o código.

##  **1️⃣ Instruções:**  
- Foi realizado a instalação do NPM e do Postgres

💡 **Códigos uteis:** 
```javascript
<instalar postgres senha (1234) (porta 5423)>
<npm install
npm install --save sequelize
npm install --save pg pg-hstore
npm install --save-dev sequelize-cli>

```
💡 **Para criar um projeto precisa executar um comando init:** 

```javascript
npx sequelize-cli init (dentro da pasta, terminal vscode)
```
📄**Todas as minhas migrations foram utilizando comandos, no repo já estão criadas, mas caso seja feito do zero, abaixo algumas dos comandos utilizados para a criações das mesmas:** 

```javascript
<npx sequelize-cli model:generate --name User --attributes name:string,email:string>
<migration:generate --name add-cpf-birthdate-to-users> Primeiro fiz um model para user, depois adicionei os campos CPF e data de nascimento
Abaixo as demais que utilizei
<npx sequelize-cli model:generate --name Transaction --attributes account_id:integer,type:string,amount:float
npx sequelize-cli migration:generate --name create-financial-institutions
npx sequelize-cli model:generate --name FinancialInstitution --attributes name:string,cnpj:string,trade_name:string
npx sequelize-cli migration:generate --name create-account
npx sequelize-cli model:generate --name Account --attributes user_id:integer,financial_institution_id:integer,balance:decimal
npx sequelize-cli migration:generate --name create-transaction
npx sequelize-cli model:generate --name Transaction --attributes account_id:integer,type:enum:{deposit,withdraw},amount:decimal>

```
🏦 **Após cada migration criada, eu realizava o migrate, criando assim nas tabelas do banco de dados, Lembre-se do banco de dados estar configurado 100%,
foi feito desta forma para que funcione tanto em bancos locais como Web:** 
  
  ```javascript
<npx sequelize-cli db:migrate>
```

🌌**Links uteis:**
```javascript
<https://sequelize.org/docs/v6/other-topics/migrations/>
<https://www.enterprisedb.com/postgresql-tutorial-resources-training-1?uuid=69f95902-b451-4735-b7e4-1b62209d4dfd&campaignId=postgres_rc_17>
```

## **2️⃣ Teste Pelo Insomnia**
**Comece:**
- Cadastrando usuario/listando/atualizando ou deletando.
- Criando Instituição/Listando.
- Criando Contas em instituições/Listando.
- Realizando saques ou depositos (withdraw ou deposit).

```Metodo GET é igual para todos os endpoints
ex: motodo GET http://localhost:3331/accounts (Lista todas as contas)
    metodo GET http://localhost:3331/accounts/1 (Lista conta ID 1)
```

**Exemplos:**
Depositar ou Sacar (Transaction):
```javascript
POST http://localhost:3331/accounts/1/transactions
{
  "type": "withdraw",
  "amount": 600.00
}
Para deposito use "deposit",
```

```javascript
criar contas: 
POST http://localhost:3331/accounts
body:
{
  "user_id": 3,
  "financial_institution_id": 1,
  "balance": 10000.00
}
```
```javascript
criar instituições 
POST http://localhost:3331/institutions
body: {
  "name": "Banco Inter",
  "cnpj": "12311111111111",
  "trade_name": "Inter"
}
```

```javascript
criar users: POST
http://localhost:3331/users
body: {
  "name": "Fulaninho",
  "email": "Fulaninho@email.com",
  "cpf": "12345666666",
  "birthdate": "2000-05-25"
```

```javascript

atualizar usuario: POST
http://localhost:3331/users/1 (o numero é o id do usuario, pois no codigo ele pega pelo ID)
body {
  "name": "Ciclano",
  "email": "ciclano@email.com",
  "cpf": "12345678900",
  "birthdate": "1990-05-20"
}
```

```javascript
Deletar usuário DEL (DELETE)
http://localhost:3331/users/3 (o numero é o id do usuario, pois no codigo ele pega pelo ID)
```
📌 **Considerações:**  
Acho que consegui retirar minhas duvidas referentes ao NodeJS + Bancos + Estruturação de códigos, visto que, existe uma pasta para Models, os Controllers também possuem uma pasta própia, e oara referenciar tudo isso o routes.js é essencial, 
mantendo o código, **LIMPO E ORGANIZADO**, desde já, estou aceitando dicas e sugestões.


<img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/143.png">
 
