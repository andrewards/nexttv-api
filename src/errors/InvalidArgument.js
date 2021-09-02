class InvalidArgument extends Error {

    constructor() {
        super(`Invalid Data!`);
        this.name = 'InvalidArgumentError';
        this.status = 400;
    }

    getStatusCode() {
        return this.status;
    }
}

module.exports = InvalidArgument;