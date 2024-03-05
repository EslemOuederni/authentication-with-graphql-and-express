const user = require('../models/User.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// jwt 

const generateToken = (id) => {
    return jwt.sign({id},"hellosecret", {
        expiresIn: "5d"
    });
}

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    
    // validate the data

    if(!username || !password || !email){
        return res.status(400).json({message: 'Please enter all fields'});
    }
    
    // validate email

    if(!validator.isEmail(email)){
        return res.status(400).json({message: 'Please enter a valid email'});
    }
    // check for existing user

    const alreadyRegistered = await user.findOne({ email });
    if (alreadyRegistered){
        return res.status(400).json({message: 'User already exists'});
    }

    // generate salt and hash password

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await user.create({
        username: username,
        password: hash,
        email: email
    });

    if(newUser){
    return res
        .status(200)
        .cookie('token', generateToken(newUser._id), {
            httpOnly: true
        })
        .json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id),
            message: 'User created successfully'
        });
    }
}

// login controller

module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    // validate the data

    if(!email || !password){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    // validate email

    if(!validator.isEmail(email)){
        return res.status(400).json({message: 'Please enter a valid email'});
    }

    // check for existing user

    const existingUser = await user.findOne({email});

    if(!existingUser){
        return res.status(400).json({message: 'User does not exist'});
    }

    // validate password

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if(!validPassword){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    if(existingUser && validPassword){
        return res
        .status(200)
        .cookie('token', generateToken(existingUser._id), {
            httpOnly: true
        })
        .json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            token: generateToken(existingUser._id)
        });
    }

}

module.exports.allUsers = async (req, res) => {
    const allUsers = await user.find({});
    if(allUsers){
        return res.status(200).json(allUsers);
    }
}

module.exports.userInformation = async (req, res) => {
    const {id} = req.body;
    console.log(id);
    const userInformation = await user.findOne({_id: id});
    if(userInformation){
        return res.status(200).json(userInformation);
    }
}


