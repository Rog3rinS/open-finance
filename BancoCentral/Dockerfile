FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

# Now copy the full source
COPY . .

# Default command
CMD sh -c 'echo "API disponível em http://localhost:$PORT" && npm start'
