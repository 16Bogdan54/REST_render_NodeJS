const mongoose = require('mongoose');

const { SENDER_EMAIL, BASE_URL } = process.env;

const verificationMessage = (email) => {
    const verificationToken = new mongoose.Types.ObjectId();

    const verifyMessage = {
        to: email,
        from: SENDER_EMAIL,
        subject: "Verification",
        text: "Verify your account by clicking the link bellow",
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Verify</a>`
    }

    return {verifyMessage, verificationToken}
}

module.exports = {verificationMessage}