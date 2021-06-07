const express = require('express');

const routes = express.Router();

const {listar, obtenerPersona, crear, editar, eliminar} = require('../controllers/controlPersonal');

routes.get('/Personal/', listar);

routes.get('/Personal/:id', obtenerPersona)

routes.post('/Personal/', crear )

routes.put('/Personal/:id', editar)

routes.delete('/Personal/:id', eliminar)

module.exports = routes;