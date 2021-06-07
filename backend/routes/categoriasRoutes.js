const express = require('express');

const routes = express.Router();

const {listar, crear, eliminar} = require('../controllers/controlCategoria');

routes.get('/Categorias', listar);

routes.post('/Categorias', crear )

routes.delete('/Categorias/:id', eliminar)

module.exports = routes;