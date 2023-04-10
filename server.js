const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const config = require('./config/config');
const logger = require('./logger/logger');

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

const app = express();

(async () => {
    try {
        await mongoose.connect(config.mongo.url);
        logger.info("connected to database");
        startServer();
    } catch(err) {
        logger.error(err)
    }
})();

const startServer = () => {
    app.use((req, res, next) => {
        logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]` )

        res.on('finish', () => {
            logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`)
        })

        next();
    })

    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    // API rules
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({})
        }

        next()
    })

    app.use('/api/auth', authRoutes);
    app.use('/users', userRoutes)
    app.use('/articles', articleRoutes)

    app.use((req, res) => {
        const err = new Error('not found')

        logger.error(err)

        return res.status(404).json({message: err.message})
    })

    http.createServer(app).listen(config.server.port, () => logger.info(`Server is running on port ${config.server.port}`))
}