import './database/index.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;  // usa 3333 como padrão se não definir variável de ambiente

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
