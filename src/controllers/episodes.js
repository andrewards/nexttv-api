const CRUD = require('./CRUD');
const models = require('../db/models');

class episodes extends CRUD {

    constructor() {
        super('episodes');
    }

    async readWithTitleName(req, res, next) {
        try {
            const results = await models.episodes.findAll({
                attributes: [
                    'id',
                    'season',
                    'episode',
                    'when',
                ],
                where: {
                },
                order: [['when', 'asc']],
                include: [models.titles],
            });
            res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new episodes;