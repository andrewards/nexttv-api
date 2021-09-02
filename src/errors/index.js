const { JsonWebTokenError } = require('jsonwebtoken');
const isKnownError = require('../utils/isKnownError');

module.exports = (err, req, res, next) => {
    let status = 500;
    if (isKnownError(err)) {
        status = err.getStatusCode();
    } else if (err instanceof JsonWebTokenError) {
        status = 401;
    }

    res.status(status);
    res.json({ errorName: err.name, errorMessage: err.message });
};