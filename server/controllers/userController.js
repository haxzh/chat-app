const router = require('express').Router();
const User = require('./../models/user');
const authMiddleware = require('./../middlewares/authMiddleware');


router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
         const user = await User.findOne({ _id: req.userId }); // req.userId use karo

         res.send({
             message: "User fetched successfully",
             success: true,
             data: user
         });

    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});



router.get('/get-all-user', authMiddleware, async (req, res) => {
    try {
         const allUsers = await User.find({_id: { $ne: req.userId }}); // sab users ko fetch karo

         res.send({
             message: "Users fetched successfully",
             success: true,
             data: allUsers
         });

    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});





module.exports = router;
