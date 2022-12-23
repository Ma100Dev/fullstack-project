/* eslint-disable no-console */

const sendmail = require('sendmail')();

const from = 'admin@144.126.245.231';

const sendVerificationEmail = (email, verificationCode) => {
    sendmail({
        from,
        to: email,
        subject: 'Please verify your email',
        html: `Please verify your email by clicking this link: http://144.126.245.231:8080/verify/${verificationCode}`,
    }, (err, reply) => {
        console.log(err && err.stack);
        console.dir(reply);
    });
};

// TODO add a function to send a password reset email

module.exports = {
    sendVerificationEmail,
};
