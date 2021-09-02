const path = require('path');
const sweep = require('./sweep');

module.exports = (error) => {
    let isKnown = false;

    sweep(path.resolve(__dirname, '..', 'errors'), (file) => {
        const knownError = require(`../errors/${file}`);
        if (error instanceof knownError) {
            isKnown = true;
        }
    });

    return isKnown;
}