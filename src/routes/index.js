const sweep = require('../utils/sweep');

module.exports = app => {
    sweep(__dirname, (entity) => {
        const routes = require(`./${entity}`);
        app.use(`/${entity}`, routes);
    });
}
