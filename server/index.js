const io = require('socket.io')(5000);

const allowedUsers = [
    'admin'
];

const users = {};

io.on('connection', socket => {

    // Handle Login
    socket.on('log-in', data => {
        const username = data[0];
        users[socket.id] = username;
        const id = data[1];

        if (allowedUsers.includes(id)) {
            socket.emit('log-in-result', data);
        } else {
            socket.emit('log-in-result', false);
        }
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', [message, users[socket.id]])
    })
})
