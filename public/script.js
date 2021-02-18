const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

if (messageForm != null) {
    const naeme = prompt('What is ur name?');
    appendMessage('You Joined');
    socket.emit('new-user', roomName, naeme);

    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`You: ${message}`);
        socket.emit('send-chat-message', roomName, message);
        messageInput.value = '';
    });
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    if(roomContainer != null) {
        roomContainer.append(roomElement);
        roomContainer.append(roomLink);
    }
})

socket.on('chat-message', data => {
    appendMessage(`${data.naeme}: ${data.message}`);
})

socket.on('user-connected', naeme => {
    appendMessage(`${naeme} has joined the chat`);
})

socket.on('user-disconnected', naeme => {
    appendMessage(`${naeme} has left the chat`);
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    if (messageContainer != null) {
        messageContainer.append(messageElement);
    }
}