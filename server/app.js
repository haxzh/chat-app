
const express = require('express');
const app = express();



const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController')



app.use(express.json()); // user auth controller
app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/chat', chatController);
app.use('/api/message', messageController);
module.exports = app;