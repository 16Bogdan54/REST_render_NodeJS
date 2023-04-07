const mongoose = require('mongoose')

const ArticleModel = require('../models/articleModel');

const create = async (req, res) => {
    const article = new ArticleModel({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })

    try {
        const savedArticle = await article.save();
        return res.status(201).json({article: savedArticle})
    } catch (error) {
        return res.status(500).json({error})
    }
};

const readById = async (req, res) => {
    const id = new mongoose.Types.ArticleId;

    try {
        const article = await ArticleModel.findById(id);

        if(article) {
            return res.status(200).json({article})
        } else {
            return res.status(404).json({message: 'not found'})
        }
    } catch (error) {
        return res.status(500).json({error})
    }
}

const readAll = async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        return res.status(200).json({articles})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const update = async (req, res) => {
    const id = await req.params.articleId;

    try {
        const article = await ArticleModel.findById(id)

        if(article) {
            return res.status(201).json({article: article.set(req.body).save()})
        } else {
            return res.status(404).json({message: 'not found'})
        }
    } catch (error) {
        return res.status(500).json({error})
    }
}

const deleteById = async (req, res) => {
    const id = await req.params.articleId

    try {
        const article = await ArticleModel.findByIdAndDelete(id);

        if(article) {
            return res.status(201).json({article, message: 'Article deleted successfully'})
        } else {
            return res.status(404).json({message: 'not found'})
        }

    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {
    create,
    readById,
    readAll,
    update,
    deleteById
}

