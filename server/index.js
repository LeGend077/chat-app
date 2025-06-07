const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server running');
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
