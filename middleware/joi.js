const joi = require('joi');

const logger = require('../logger/logger');

const Validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (err) {
            logger.error(err)

            return res.status(422).json({err})
        }
    }
}

const Schemas = {
    user: {
        create: joi.object({
            name: joi.string().required(),
            password: joi.string().required(),
            description: joi.string()
        }),
        update: joi.object({
            name: joi.string(),
            password: joi.string(),
            description: joi.string()
        })
    },
    article: {
        create: joi.object({
            title: joi.string().required(),
            paragraph: joi.string().required(),
            author: joi.object().required()
        }),
        update: joi.object({
            title: joi.string(),
            paragraph: joi.string(),
            author: joi.object()
        })
    }
}
module.exports = {
    Validate,
    Schemas
}