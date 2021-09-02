const CRUD = require('./CRUD');
const models = require('../db/models');

class titles extends CRUD {

    constructor() {
        super('titles');
    }

    async episodesSeasons(req, res, next) {
        try {
            const { id, number_season } = req.params;
            const results = await models.episodes.findAll({
                attributes: [
                    'id',
                    'season',
                    'episode',
                    'when',
                ],
                where: {
                    show_id: Number(id),
                    season: Number(number_season),
                },
                order: [['when', 'asc']],
                include: [{
                    model: models.titles,
                    attributes: [
                        'id',
                        'name',
                        'photo',
                    ]
                }]
            });
            res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new titles;