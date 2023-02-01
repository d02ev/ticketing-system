const Route = require('express').Router();
const UserController = require('../controllers/user.controller');

Route.post('/register', UserController.register);
Route.post('/login', UserController.login);

module.exports = Route;