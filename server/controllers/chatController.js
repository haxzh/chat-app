const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const Chat = require('./../models/chat');


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


module.exports = router;