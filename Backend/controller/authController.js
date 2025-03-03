const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, confirmPassword, profileImageUrl } = req.body;

    //validation check for required fields
    if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    //confirm password Check
    if(password !== confirmPassword){
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try{
        //Check if email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists! Change Your Email." });
        }

        //Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" , error: err.message });
    }
};

//Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    //validation check for required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try{
        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        //Check if password is correct 
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" , error: err.message });
    }
};

//Get user info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }  

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" , error: err.message });
    }
};