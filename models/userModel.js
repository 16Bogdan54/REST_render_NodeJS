const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        password: {type: String, required: true},
        description: {type: String, required: false}
    },
    {
        versionKey: false
    }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserSchema,
    UserModel
}