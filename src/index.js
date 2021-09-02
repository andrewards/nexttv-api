require('dotenv').config();
const server = require('./config/server');
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('update_watch', () => {
        io.emit('update_watch');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('API rodando...');
});