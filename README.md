# Open Finance Emulator

Este repositório simula um ecossistema Open Finance com múltiplas APIs representando bancos e serviços do sistema financeiro brasileiro.

## 🧱 Estrutura dos Serviços

- `bank-account-api` — (porta 3004)
- `apibanco` — (porta 3001)
- `bancocentral` — (porta 3003)
- `api-minibc` — (porta 3002)
- `mini-banco-central` — (porta 3005)
- `postgres` — Banco de dados para os serviços (porta 5433)

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/Rog3rinS/open-finance.git
```

```bash
cd open-finance
```

### 2. Suba os containers com Docker Compose

```bash
sudo docker compose up --build -d
```

> ✅ As APIs estarão disponíveis em `http://localhost:<porta>` e você verá mensagens como:
>
> ```
> API disponível em http://localhost:3004
> ```

---

## 🧪 Migrations 

Para rodar as migrations foi criado um script, entao use (talvez seja necessario voce dar permissoes para o script executar):

```bash
./run-migrations.sh
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
