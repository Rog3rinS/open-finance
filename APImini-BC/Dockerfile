FROM node:22

WORKDIR /app

COPY . .

RUN npm install

CMD sh -c 'echo "API disponível em http://localhost:$PORT" && npm start'
