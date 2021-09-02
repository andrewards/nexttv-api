const Router = require('express').Router();
const titles_groups = require('../controllers/titles_groups');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', titles_groups.create);

// READ
Router.get('/', titles_groups.readAll);
Router.get('/:id', titles_groups.readOne);

// UPDATE
Router.put('/:id', titles_groups.update);

// DELETE
Router.delete('/:id', titles_groups.delete);

module.exports = Router;