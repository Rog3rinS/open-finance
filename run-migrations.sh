#!/bin/bash

set -e

echo "🔄 Iniciando migrations para os serviços..."

# bank-account-api
echo "🔹 Rodando migrations: bank-account-api"
sudo docker exec -it open-finance-teste-bank-account-api-1 npx sequelize db:migrate

# mini-banco-central
echo "🔹 Rodando migrations: mini-banco-central"
sudo docker exec -it open-finance-teste-mini-banco-central-1 npx sequelize db:migrate

# bancocentral
echo "🔹 Rodando migrations: bancocentral"
sudo docker exec -it open-finance-teste-bancocentral-1 npx sequelize db:migrate

# api-minibc
echo "🔹 Rodando migrations: api-minibc"
sudo docker exec -it open-finance-teste-api-minibc-1 npx sequelize db:migrate

echo "✅ Todas as migrations foram executadas com sucesso!"
