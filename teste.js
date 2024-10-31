let botPrompt = '';

function setPrompt() {
  botPrompt = document.getElementById('promptInput').value;
  addMessage('Bot', `Prompt configurado: ${botPrompt}`);
}

async function sendMessage() {
  const userMessage = document.getElementById('userMessage').value;
  addMessage('Você', userMessage);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: botPrompt },
        { role: 'user', content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const botResponse = data.choices[0].message.content;
  addMessage('Bot', botResponse);
  document.getElementById('userMessage').value = '';
}

function addMessage(sender, message) {
  const chatBox = document.getElementById('chatBox');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender === 'Você' ? 'user-message' : 'bot-message');
  messageElement.innerText = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
