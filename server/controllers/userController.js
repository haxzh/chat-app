const router = require('express').Router();
const User = require('./../models/user');
const authMiddleware = require('./../middlewares/authMiddleware');
const message = require('./../models/message');
const cloudinary = require('./../cloudinary');
const user = require('./../models/user');


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


// router.post('/upload-profile-pic', authMiddleware, async (req, res) => {
//     try{
//         const image = req.body.image;

//         //UPLOAD THE IMAGE TO CLODINARY
//         const uploadedImage = await cloudinary.uploader.upload(image, {
//             folder: 'quick-chat'
//         });

//         //UPDATE THE USER MODEL & SET THE PROFILE PIC PROPERTY
//         const user = await User.findByIdAndUpdate(
//             {_id: req.body.userId},
//             { profilePic: uploadedImage.secure_url},
//             { new: true}
//         );

//         res.send({
//             message: 'Profic picture uploaded successfully',
//             success: true,
//             data: user
//         })
//     }catch(error){
//         res.send({
//             message: error.message,
//             success: false
//         })
//     }
// })


router.post('/upload-profile-pic', authMiddleware, async (req, res) => {
    try{
        const { userId, image } = req.body;
        if (!userId || !image) {
            return res.status(400).send({
                message: "userId and image are required",
                success: false
            });
        }

        //UPLOAD THE IMAGE TO CLOUDINARY
        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: 'quick-chat'
        });

        //UPDATE THE USER MODEL & SET THE PROFILE PIC PROPERTY
        const user = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadedImage.secure_url},
            { new: true}
        );

        res.send({
            message: 'Profile picture uploaded successfully',
            success: true,
            data: user
        })
    }catch(error){
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;



