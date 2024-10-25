document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase(); // Convert to lowercase for consistency
    if (userInput) {
        addMessageToChatBox(userInput, 'user-message');
        document.getElementById('user-input').value = '';  // Clear input

        // Handle custom responses based on the user's input
        handleCustomResponse(userInput);
    }
});

function addMessageToChatBox(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    document.getElementById('chat-box').appendChild(messageElement);
}

function handleCustomResponse(message) {
    // Custom responses for specific questions
    let botResponse = '';
    
    if (message.includes("what is your name")) {
        botResponse = "My name is Sakthivel.";
    } else if (message.includes("how old are you")) {
        botResponse = "I'm 23 years old.";
    } else if (message.includes("where do you study")) {
        botResponse = "I study at Bannari Amman Institute of Technology.";
    } else {
        // If the question is not recognized, send it to Azure Bot Service for handling
        sendMessageToBot(message);
        return;  // Return here because the bot service will handle the response
    }

    // If a custom response was found, display it in the chatbox
    addMessageToChatBox(botResponse, 'bot-message');
}

function sendMessageToBot(message) {
    fetch('https://<your-azure-bot-service-endpoint>/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'message',
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        addMessageToChatBox(data.text, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChatBox('Error: Unable to connect to Sakthivel. Please try again later.', 'bot-message');
    });
}
