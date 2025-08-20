 const mongoose = require('mongoose');

  const messageScema = new mongoose.Schema({
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'

    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    text: {
        type: String,
        required: true
    },
    read:{
        type: Boolean,
        default: false
    }
  }, { timestamps: true }); 

  module.exports = mongoose.model('Messages', messageScema)