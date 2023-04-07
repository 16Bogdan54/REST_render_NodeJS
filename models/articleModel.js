const mongoose = require('mongoose');
const UserSchema = require('./userModel')

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    paragraph: {type: String, required: true},
    date: {type: Date, required: true},
    author: UserSchema
})

const ArticleModel = mongoose.model('Post', ArticleSchema)

module.exports = ArticleModel