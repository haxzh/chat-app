


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId; // yahan set karo, req.body par nahi
        next();
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        });
    }
};