const sendgrid = require('@sendgrid/mail')

const {SG_API_KEY} = process.env;

sendgrid.setApiKey(SG_API_KEY);

module.exports = sendgrid