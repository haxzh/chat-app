const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const Chat = require('./../models/chat');
const Message = require('./../models/message');

router.post('/create-new-chat', authMiddleware, async (req, res) => {
    try{
        const chat = new Chat(req.body);
        const saveChat = await chat.save();

        res.status(200).send({
            message: "Chat created successfully",
            success: true,
            data: saveChat
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }

});


router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try{
        const allChats = await Chat.find({members: { $in: [req.userId] }}).populate('members').sort({updatedAt: -1});

        res.status(200).send({
            message: "Chat fetched successfully",
            success: true,
            data: allChats
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }

});

router.post('/clear-unread-messages', authMiddleware, async (req, res) => {
    try{
        const chatId = req.body.chatId;

        //We want to update the unread message count in chat collection
        const chat = await Chat.findById(chatId);
        if(!chat){
            res.send({
                message: "No Chat found with given chat ID.",
                success: false
            })
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { unreadMessageCount: 0},
            { new: true}
        ).populate('members').populate('lastMessage');

        //we want to update the read property to true in message collection
        await Message.updateMany(
            {chatId: chatId, read: false},
            { read: true }
        )

        res.send({
            message: "Unread message cleared successfully",
            success: true,
            data: updatedChat
        })
    }catch(error){
        res.send({
            message: error.message,
            success: false
        })
    }
})


module.exports = router;