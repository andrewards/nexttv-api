const Router = require('express').Router();
const episodes = require('../controllers/episodes');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', episodes.create);

// READ
Router.get('/', episodes.readWithTitleName);
Router.get('/:id', episodes.readOne);

// UPDATE
Router.put('/:id', episodes.update);

// DELETE
Router.delete('/:id', episodes.delete);

module.exports = Router;