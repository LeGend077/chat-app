const socket = io('https://chat-app-p0ot.onrender.com/', { transports: ["websocket"] });

// Get and emit login data

let loginData = [prompt('Enter Username:'), prompt('Enter ID:')];
socket.emit('log-in', loginData);

// wait for signal if login succeeded to proceed
socket.on('log-in-result', data => {
    if (data) {
        app(data);
    } else {
        alert('Login Failed!');
        window.location.replace('/');
    }
})

// Handle the App
function app(data) {
    document.getElementById('main-heading').innerText += ' ' + data[0] + '!';
}

document.getElementById('send').addEventListener('click', () => {
    let message = document.getElementById('message').value.replace(/\n/g, '<br>')
    socket.emit('send', message)

    document.getElementById('content').innerHTML += '<div>' + 'You: ' + message + '</div>'
})

socket.on('receive', message => {
    document.getElementById('content').innerHTML += '<div>' + message[1] + ': ' + message[0] + '</div>'
})
