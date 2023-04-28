const jwt = require('jsonwebtoken');

const {ACCESS_TOKEN_SECRET, EXPIRES_IN} = process.env;

const generateAccessToken = (user) => {
    const payload = {
        id: user._id
    }

    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: EXPIRES_IN
    })
}

module.exports = { generateAccessToken };
