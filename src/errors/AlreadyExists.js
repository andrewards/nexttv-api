class AlreadyExists extends Error {

    constructor() {
        super(`These data have already been registered!`);
        this.name = 'AlreadyExistsError';
        this.status = 400;
    }

    getStatusCode() {
        return this.status;
    }
}

module.exports = AlreadyExists;