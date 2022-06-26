const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const authentication = require('../authentication/authentication');

const { Router } = require('express');

//login route (GET)
route.get('/',services.login)

//gallery route (GET)
route.get('/gallery',authentication.authenticateJWT, services.gallery)

//bo route (GET)
route.get('/bo',authentication.authenticateJWT,services.bo)

//bo add recipe route (GET)
route.get('/bo/add-book',authentication.authenticateJWT, services.bo_add_book)

//bo update recipe route (GET)
route.get('/bo/update-book',authentication.authenticateJWT, services.bo_update_book)

//API
route.post('/api/book',authentication.authenticateJWT, controller.create)
route.get('/api/book',controller.find)
route.post('/api/book/update',authentication.authenticateJWT,controller.update)
route.post('/api/book/delete',authentication.authenticateJWT, controller.delete)

route.post('/api/login', controller.login)

module.exports = route