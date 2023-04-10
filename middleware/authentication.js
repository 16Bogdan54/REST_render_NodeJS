const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');

const {ACCESS_SECRET_KEY} = process.env;

const authentication = async (req, res, next) => {

    const {authorization = ""} = req.headers;

    const [bearer, token] = authorization.split(" ");

    if(bearer !== "Bearer") {
        return res.status(401)
    }

    try {
        const {id} = jwt.verify(token, ACCESS_SECRET_KEY);

        const user = await UserModel.finById(id);

        if(!user || !user.accessToken) {
            return res.status(401);
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ error })
    }

}

module.exports = authentication