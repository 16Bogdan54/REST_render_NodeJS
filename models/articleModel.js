const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    paragraph: {type: String, required: true},
    date: {type: Date, required: true},
    author: {type: String, required: true}
})

const ArticleModel = mongoose.model('Post', ArticleSchema)

module.exports = ArticleModel