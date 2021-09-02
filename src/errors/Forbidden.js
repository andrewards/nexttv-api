class Forbidden extends Error {

    constructor() {
        super(`Access token required for this route!`);
        this.name = 'ForbiddenError';
        this.status = 403;
    }

    getStatusCode() {
        return this.status;
    }
}

module.exports = Forbidden;