const InvalidArgumentError = require('../errors/InvalidArgument');
const AlreadyExistsError = require('../errors/AlreadyExists');
const repository = require('../db');

module.exports = async (req, res, next) => {
    const entity = req.originalUrl.substr(1);
    const approvals = require(`./${entity}`);

    const db = repository(entity);

    const data = req.body;

    try {

        for (let i = 0; i < approvals.length; i++) {
            let field = approvals[i].field;
            let value = data[field];

            if ((!approvals[i].optional && !value) || (approvals[i].min && approvals[i].min > value.length)|| (approvals[i].max && approvals[i].max < value.length)) {
                throw new InvalidArgumentError();
            }

            if (approvals[i].regex) {
                if (Array.isArray(approvals[i].regex)) {
                    approvals[i].regex.forEach(eachRegex => {
                        if (!value.match(eachRegex)) {
                            throw new InvalidArgumentError();
                        }
                    });
                } else if (!value.match(approvals[i].regex)) {
                    throw new InvalidArgumentError();
                }
            }

            if (approvals[i].unique) {
                const exists = await db.findOneByField(field, value);
                if (exists) {
                    throw new AlreadyExistsError();
                }
            }
        }

        next();

    } catch(err) {
        next(err);
    }
}