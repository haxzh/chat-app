const express = require('express');
const app = express();
const cors = require('cors');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');

// ✅ Allowed Origins
const allowedOrigins = [
//   "http://localhost:3000", 
  "https://chat-app-client-p3jv.onrender.com"   // <- tumhara deployed client
];

// ✅ Express CORS Config
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));

const server = require('http').createServer(app);

// ✅ Socket.io CORS Config
const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/chat', chatController);
app.use('/api/message', messageController);

const onlineUser = [];

// ✅ Socket.io Events
io.on('connection', socket => {
    socket.on('join-room', userid => {
        socket.join(userid);
    });

    socket.on('send-message', (message) => {
        io.to(message.members[0])
          .to(message.members[1])
          .emit('receive-message', message);

        io.to(message.members[0])
          .to(message.members[1])
          .emit('set-message-count', message);
    });

    socket.on('clear-unread-messages', data => {
        io.to(data.members[0])
          .to(data.members[1])
          .emit('message-count-cleared', data);
    });

    socket.on('user-typing', (data) => {
        io.to(data.members[0])
          .to(data.members[1])
          .emit('started-typing', data);
    });

    socket.on('user-login', userId => {
        if (!onlineUser.includes(userId)) {
            onlineUser.push(userId);
        }
        socket.emit('online-users', onlineUser);
    });

    socket.on('user-offline', userId => {
        onlineUser.splice(onlineUser.indexOf(userId), 1);
        io.emit('online-users-updated', onlineUser);
    });
});

module.exports = server;
