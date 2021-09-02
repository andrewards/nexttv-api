const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../auth');
const CRUD = require('./CRUD');
const InvalidArgumentError = require('../errors/InvalidArgument');

const models = require('../db/models');

class users extends CRUD {

    constructor() {
        super('users');
        this.expressMethods.push('login');
        this.bind();
    }

    async hash(req, res, next) {
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 12);
        req.body.password = passwordHash;
        next();
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            
            let user = await this.db.findOneByField('username', username);
            if (!user) throw new InvalidArgumentError();

            const verifyPass = await bcrypt.compare(password, user.password);
            if (!verifyPass) throw new InvalidArgumentError();

            const token = generateAccessToken({ id: user.id });
            res.set('Access-Token', token);

            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

    async next(req, res, next) {
        try {
            const { user_id } = req.params;
            
            const user = await models.users.findOne({
                where: {
                    id: user_id,
                },
                attributes: [
                    'id',
                    'name',
                    'username',
                ],
                include: [models.watches],
            });

            let list_episodes = [];

            for (let w = 0; w < user.watches.length; w++) {
                const watch = user.watches[w];

                const ep = await models.episodes.findOne({
                    where: {
                        id: watch.episode_id,
                    },
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

                list_episodes.push(ep);
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

            user.dataValues.seenEPs = list_episodes;

            delete user.dataValues.watches;
            
            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

}

module.exports = new users;