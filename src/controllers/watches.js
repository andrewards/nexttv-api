const CRUD = require('./CRUD');
const models = require('../db/models');

class watches extends CRUD {

    constructor() {
        super('watches');
    }

    async createPerUser(req, res, next) {
        try {
            const { user_id } = req.params;
            const { title_id, episode_id } = req.body;

            const exists = await models.watches.findOne({
                where: {
                    user_id,
                    title_id,
                    episode_id,
                },
            });

            if (!exists) {
                await models.watches.create({
                    user_id,
                    title_id,
                    episode_id,
                });
            }

            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

    async deletePerUser(req, res, next) {
        try {
            const { user_id } = req.params;
            const { title_id, episode_id } = req.body;
            await models.watches.destroy({
                where: {
                    user_id,
                    title_id,
                    episode_id,
                }
            });
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new watches;