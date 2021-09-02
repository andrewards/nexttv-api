const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/Forbidden');

module.exports = {
    generateAccessToken: (payload) => {
        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '15m',
        });
    },
    middleware: (req, res, next) => {
        /*
        let token = req.get('Authorization');
        if (token) {
            token = token.split(' ')[1];
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.payload = payload;
        } else throw new ForbiddenError();
        */
        next();
    }
}