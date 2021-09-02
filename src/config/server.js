const express = require('express');
const http = require('http');

const Routes = require('../routes');
const handlers = require('../errors');

const app = express();

app.use(express.json());
Routes(app);

// handlers middleware
app.use(handlers);

const server = http.createServer(app);

module.exports = server;