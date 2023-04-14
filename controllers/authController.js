const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')
const logger = require("../logger/logger");
const sendMail = require('../helpers/sendEmail')
const verificationMessage = require("../helpers/verificationMessage");
const {generateAccessToken} = require("../helpers/token");

const {EXPIRES_IN} = process.env;

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email}).select('+password')

    if(!user) {
        logger.info('Invalid email or password')
        next();
        return;
    }

    const comparedPassword = await bcrypt.compare(password, user.password)

    if(!comparedPassword) {
        logger.info('Invalid password')
        next();
        return;
    }

    if(!user.verify) {
        logger.info('Unverified account')
        next();
        return;
    }

    const accessToken = generateAccessToken(user);

    await UserModel.findByIdAndUpdate({_id: user._id}, {accessToken})

    res.status(200).json({
        username: user.username,
        email: user.email,
        accessToken,
        expiresIn: EXPIRES_IN
    })
}

const register = async (req, res, next) => {
    const { email, password } = req.body;

    const userCheck = await UserModel.findOne({email})

    if(userCheck) {
        logger.info('Email already in use')
        next();
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const {verificationToken, verifyMessage} = verificationMessage(email)
    await sendMail.send(verifyMessage)

    const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        password: hashedPassword,
        verificationToken
    });

    try {
        const savedUser = await user.save();
        return res.status(201).json({
            message: 'Verify your account by email',
            email
        });
    } catch (error) {
        return res.status(500).json({ error });
    }

}

const verify = async (req, res, next) => {
    const {verificationToken} = req.params;

    try {
        const user = await UserModel.findOne({verificationToken})

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await UserModel.findByIdAndUpdate(
            {_id: user._id},
            {verificationToken: null, verify: true}
        )

        // uncomment later when front-end part is ready
        // res.redirect(CLIENT_URL)
    } catch (error) {
        return res.status(500).json({ error })
    }
}

const current = async (req, res) => {
    const { email, username } = req.user;

    res.status(200).json({ email, username });
};

const logout = async (req, res) => {
    const {_id} = req.user;

    await UserModel.findByIdAndUpdate({_id}, {accessToken: null});

    res.status(200).json({ message: 'Success!' });
}

module.exports = {
    login,
    register,
    current,
    logout,
    verify
}