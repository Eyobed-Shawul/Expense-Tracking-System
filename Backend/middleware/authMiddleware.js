const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({ message: "Not authorized to access this route" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return res.status(404).json({ message: "No user found with this id" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Not authorized to access this route" });
    }
};