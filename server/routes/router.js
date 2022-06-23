const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

//login route (GET)
route.get('/', services.login)

//gallery route (GET)
route.get('/gallery', services.gallery)

//bo route (GET)
route.get('/bo', services.bo)

//bo add recipe route (GET)
route.get('/bo/add-book', services.bo_add_book)

//bo update recipe route (GET)
route.get('/bo/update-book', services.bo_update_book)

//API
route.post('/api/book', controller.create)
route.get('/api/book', controller.find)
route.post('/api/book/update',controller.update)
route.delete('/api/book/:id', controller.delete)

module.exports = route