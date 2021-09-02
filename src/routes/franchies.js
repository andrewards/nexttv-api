const Router = require('express').Router();
const franchies = require('../controllers/franchies');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', approvals, franchies.create);

// READ
Router.get('/', franchies.readAll);
Router.get('/:id', franchies.readOne);

// UPDATE
Router.put('/:id', franchies.update);

// DELETE
Router.delete('/:id', franchies.delete);

module.exports = Router;