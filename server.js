const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const config = require('config/config');

const app = express();

(async () => {
    try {
        await mongoose.connect(config.mongo.url)
        startServer();
        console.log("connected to database")
    } catch(err) {
        console.log(err)
    }
})()

const startServer = () => {}