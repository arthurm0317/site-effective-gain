// Coloque isso dentro do DOMContentLoaded para garantir que todo o DOM esteja carregado
document.addEventListener("DOMContentLoaded", function () {
    let userDefinedPrompt = "Você é um assistente útil e profissional que responderá conforme o prompt personalizado.";

    document.getElementById('save-prompt-btn').addEventListener('click', function () {
        const promptInput = document.getElementById('user-prompt').value;
        if (promptInput.trim() !== "") {
            userDefinedPrompt = promptInput;
            alert("Prompt personalizado salvo!");
        }
    });

    document.getElementById('send-btn').addEventListener('click', async function () {
        const userInput = document.getElementById('user-input').value;
        const chatboxBody = document.getElementById('chatbox-body');

        if (userInput.trim() === "") return;

        const userMessage = document.createElement('div');
        userMessage.classList.add('response', 'user-message');
        userMessage.textContent = `Você: ${userInput}`;
        chatboxBody.appendChild(userMessage);
        chatboxBody.scrollTop = chatboxBody.scrollHeight;

        document.getElementById('user-input').value = "";

        const waitingMessage = document.createElement('div');
        waitingMessage.classList.add('response', 'bot-message');
        waitingMessage.textContent = "Aguarde, gerando resposta...";
        chatboxBody.appendChild(waitingMessage);
        chatboxBody.scrollTop = chatboxBody.scrollHeight;

        // Definindo a URL do backend
        const apiUrl = 'http://localhost:3000/api/chat';

        // Usando userDefinedPrompt com userInput no corpo da mensagem
        const messages = [
            { role: "system", content: userDefinedPrompt },
            { role: "user", content: userInput }
        ];

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: messages })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const chatResponse = data.choices[0].message.content;

                waitingMessage.remove();

                const botMessage = document.createElement('div');
                botMessage.classList.add('response', 'bot-message');
                botMessage.textContent = `Bot: ${chatResponse}`;
                chatboxBody.appendChild(botMessage);
                chatboxBody.scrollTop = chatboxBody.scrollHeight;
            } else {
                waitingMessage.textContent = "Erro ao processar a resposta.";
            }
        } catch (error) {
            waitingMessage.textContent = "Erro ao conectar com a API.";
            console.error('Erro:', error);
        }
    });
});
