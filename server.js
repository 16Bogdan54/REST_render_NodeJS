const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const config = require('config/config');
const logger = require('logger/logger');

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

const startServer = () => {}