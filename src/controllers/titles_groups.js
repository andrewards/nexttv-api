const CRUD = require('./CRUD');

class titles_groups extends CRUD {

    constructor() {
        super('titles_groups');
    }

}

module.exports = new titles_groups;