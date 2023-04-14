const express = require('express');
const ArticleController = require('../../controllers/articleController');
const {Schemas, Validate} = require('../../middleware/joi');

const articleRouter = express.Router();

articleRouter.post('/create', Validate(Schemas.article.create), ArticleController.create)
articleRouter.get('/get/:articleId', ArticleController.readById);
articleRouter.get('/get', ArticleController.readAll);
articleRouter.patch('/update/:userId', Validate(Schemas.article.update), ArticleController.update);
articleRouter.delete('/delete/:userId', ArticleController.deleteById);

module.exports = articleRouter;