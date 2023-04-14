const dotenv = require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@1stcluster.scolpvq.mongodb.net/test`

const PORT = process.env.PORT || 3001;

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
    }
}

module.exports = config;