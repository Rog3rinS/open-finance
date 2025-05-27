# Open Finance Emulator

Este repositório simula um ecossistema Open Finance com múltiplas APIs representando bancos e serviços do sistema financeiro brasileiro.

## 🧱 Estrutura dos Serviços

- `bank-account-api` — API de contas bancárias (porta 3004)
- `apibanco` — API de um banco fictício (porta 3001 ou configurável)
- `bancocentral` — API do Banco Central fictício (porta 3003)
- `api-minibc` — Mini API de integração com o Banco Central (porta 3002)
- `mini-banco-central` — Banco Central reduzido (porta 3005)
- `postgres` — Banco de dados para os serviços (porta 5433)

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/open-finance-emulator.git
cd open-finance-emulator
```

### 2. Suba os containers com Docker Compose

```bash
sudo docker compose up --build
```

> ✅ As APIs estarão disponíveis em `http://localhost:<porta>` e você verá mensagens como:
>
> ```
> API disponível em http://localhost:3004
> ```

---

## 🧪 Migrations (opcional)

Se algum container precisar rodar migrations manualmente, use:

```bash
# Exemplo para bank-account-api
sudo docker exec -it open-finance-emulator-bank-account-api-1 npx sequelize db:migrate
```

---

## 🧹 Limpando

Para parar e remover os containers:

```bash
sudo docker compose down --remove-orphans
```

---

## 💡 Notas

- Certifique-se de que as portas 3001–3005 e 5433 estejam livres.
- Verifique os logs de cada serviço com `sudo docker logs <nome-do-container>`.
- Variáveis de ambiente como `PORT` devem estar definidas no `docker-compose.yml`.

---

## 🧑‍💻 Requisitos

- Docker
- Docker Compose

---

## 📄 Licença

Este projeto está licenciado sob os termos da MIT License.
