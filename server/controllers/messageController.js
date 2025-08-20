const route = require('express').Router();
const Chat = require('./../models/chat');
const Messages = require('./../models/message');
const authMiddleware = require('./../middlewares/authMiddleware');

route.post('/new-message', authMiddleware, async (req, res) => {

    try{
        //messagge collection 
        const newMessage = new Messages(req.body);
        const savedMessage = await newMessage.save();
        // res.status(201).send({
        //     message: 'Message sent successfully',
        //     success: true
        // });


        // update the last message
        // const currentChat = await Chat.findById(req.body.chatId);
        // currentChat.lastMessage = savedMessage._id;
        // await currentChat.save();



            const currentChat = await Chat.findOneAndUpdate({
                _id: req.body.chatId
            }, {
                lastMessage: savedMessage._id,
                $inc: { unreadMessages: 1 }
            });

            res.status(201).send({
                message: 'Message sent successfully',
                success: true,
                data: savedMessage
            });



    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});


route.get('/get-all-message/:chatId', authMiddleware, async (req, res) => {
    try{
        const allMessages = await Messages.find({ chatId: req.params.chatId })
        .sort({ createdAt: 1 });
        res.status(200).send({
            message: 'Messages fetched successfully',
            success: true,
            data: allMessages
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        
        });
    }

})

module.exports = route;