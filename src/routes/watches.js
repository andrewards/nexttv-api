const Router = require('express').Router();
const watches = require('../controllers/watches');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', watches.create);

// READ
Router.get('/', watches.readAll);
Router.get('/:id', watches.readOne);

// UPDATE
Router.put('/:id', watches.update);

// DELETE
Router.delete('/:id', watches.delete);

module.exports = Router;