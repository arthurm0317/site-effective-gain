require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Instale com `npm install node-fetch`
const cors = require('cors');  // Importe o pacote CORS
const app = express();
const port = 3000;

// Habilite o CORS para qualquer origem
app.use(cors());

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const messages = req.body.messages;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao conectar com a API.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
