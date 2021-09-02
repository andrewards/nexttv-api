const Router = require('express').Router();
const groups = require('../controllers/groups');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', groups.create);

// READ
Router.get('/', groups.searchGroups);
Router.get('/:id', groups.searchGroup);

// UPDATE
Router.put('/:id', groups.update);

// DELETE
Router.delete('/:id', groups.delete);

module.exports = Router;