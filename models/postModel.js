const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    paragraph: {type: String, required: true},
    date: {type: Date, required: true},
    author: {type: String, required: true}
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel