const models = require('./models');

class db {

    constructor(entity) {
        this.entity = entity;
    }

    create(newData) {
        return models[this.entity].create(newData);
    }

    findAll(where={}) {
        return models[this.entity].findAll({
            where,
        });
    }

    findOneById(id) {
        return models[this.entity].findOne({
            where: {
                id: Number(id),
            }
        });
    }

    findOneByField(field, value) {
        return models[this.entity].findOne({
            where: {
                [field]: value,
            }
        });
    }

    update(updateData, id) {
        return models[this.entity].update(updateData, {
            where: {
                id: Number(id),
            }
        });
    }

    delete(id) {
        return models[this.entity].destroy({
            where: {
                id: Number(id),
            }
        });
    }
}

module.exports = entity => {
    return new db(entity);
};