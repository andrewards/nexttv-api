const CRUD = require('./CRUD');
const models = require('../db/models');

class groups extends CRUD {

    constructor() {
        super('groups');

        //this.expressMethods.push('searchGroups');
        //this.bind();
    }

    async searchGroups(req, res, next) {
        try {
            let groups = await models.groups.findAll({
                attributes: [
                    'id',
                    'name',
                ],
            });

            res.status(200).json(groups);
        } catch(err) {
            next(err);
        }
    }

    async searchGroup(req, res, next) {
        try {
            const { id } = req.params;
            let group = await models.groups.findOne({
                where: {
                    id: Number(id),
                },
                attributes: [
                    'id',
                    'name',
                ],
                include: [models.titles_groups]
            });
                
            let list_episodes = [];

            for (let tg = 0; tg < group.titles_groups.length; tg++) {
                const title_group = group.titles_groups[tg];
                console.log(title_group);
                const where = {};
                where.show_id = title_group.title_id;
                if (title_group.season) where.season = title_group.season;
                const episodes = await models.episodes.findAll({
                    where,
                    attributes: [
                        'id',
                        'name',
                        'season',
                        'episode',
                        'when',
                    ],
                    include: [
                        {
                            model: models.titles,
                            attributes: [
                                'id',
                                'name',
                                'photo',
                            ]
                        }
                    ]
                });

                episodes.forEach(ep => {
                    list_episodes.push(ep);
                });
            }

            function orderByWhen(a, b) {
                let Awhen = new Date(a.when).getTime();
                let Bwhen = new Date(b.when).getTime();
                if (Awhen < Bwhen){
                    return -1;
                }
                if (Awhen > Bwhen){
                    return 1;
                }
                if (Awhen === Bwhen) {
                    if (a.name < b.name){
                        return -1;
                    }
                    if (a.name > b.name){
                        return 1;
                    }
                }
                return 0;
            }

            list_episodes = list_episodes.sort(orderByWhen);

            group.dataValues.episodes = list_episodes;

            delete group.dataValues.titles_groups;


            res.status(200).json(group);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new groups;