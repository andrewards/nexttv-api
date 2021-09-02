const db = require('../db');

class CRUD {

    constructor(entity) {
        this.db = db(entity);

        this.expressMethods = [
            'create',
            'readAll',
            'readOne',
            'update',
            'delete',
        ];
        this.bind();

    }

    bind() {
        this.expressMethods.forEach(method => {
            this[method] = this[method].bind(this);
        });
    }

    // CREATE

    async create(req, res, next) {
        try {
            const newData = req.body;
            const created = await this.db.create(newData);
            res.status(201).json(created);
        } catch(err) {
            next(err);
        }
    }

    // READ

    async readAll(req, res, next) {
        try {
            const results = await this.db.findAll();
            results.forEach(result => {
                delete result.dataValues.createdAt;
                delete result.dataValues.updatedAt;
            });
            res.status(200).json(results);
        } catch(err) {
            next(err);
        }
    }

    async readOne(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.db.findOneById(id);
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    // UPDATE

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            await this.db.update(updateData, id);
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

    // DELETE

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.db.delete(id);
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }

}

module.exports = CRUD;