const Router = require('express').Router();
const titles = require('../controllers/titles');
const auth = require('../auth').middleware;
const approvals = require('../validations');

Router.use(auth);

// CREATE
Router.post('/', titles.create);

// READ
Router.get('/', titles.readAll);
Router.get('/:id', titles.readOne);
Router.get('/:id/season/:number_season', titles.episodesSeasons);

// UPDATE
Router.put('/:id', titles.update);

// DELETE
Router.delete('/:id', titles.delete);

module.exports = Router;