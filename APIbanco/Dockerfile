FROM node:22

WORKDIR /app

COPY . .

RUN npm install && chmod +x node_modules/.bin/sequelize

CMD sh -c 'echo "API disponível em http://localhost:$PORT" && npm start'
