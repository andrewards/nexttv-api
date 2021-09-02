const Router = require('express').Router();
const users = require('../controllers/users');
const approvals = require('../validations');

Router.use('/login', approvals, users.login);

module.exports = Router;