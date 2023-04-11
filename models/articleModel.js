const mongoose = require('mongoose');
const UserSchema = require('./userModel')

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    paragraph: {type: String, required: true},
    date: {type: Date, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

module.exports = ArticleModel