const CRUD = require('./CRUD');

class franchies extends CRUD {

    constructor() {
        super('franchies');
    }

}

module.exports = new franchies;