const Router = require('express').Router();
const users = require('../controllers/users');
const watches = require('../controllers/watches');
const middleware_approvals = require('../validations');
const auth = require('../auth').middleware;

// CREATE
Router.post('/', middleware_approvals, users.hash, users.create);
Router.post('/:user_id/watch', watches.createPerUser);

// READ
Router.get('/', auth, users.readAll);
Router.get('/:id', auth, users.readOne);
Router.get('/:user_id/next', users.next);

// UPDATE
Router.put('/:id', auth, users.update);

// DELETE
Router.delete('/:id', auth, users.delete);
Router.delete('/:user_id/watch', watches.deletePerUser);

module.exports = Router;