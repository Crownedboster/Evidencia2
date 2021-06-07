const express = require('express');

const routes = express.Router();

const {listar, obtenerTicket, crear, editar, eliminar} = require('../controllers/controlTickets');

routes.get('/Tickets/', listar);

routes.get('/Tickets/:id', obtenerTicket)

routes.post('/Tickets/', crear )

routes.put('/Tickets/:id', editar)

routes.delete('/Tickets/:id', eliminar)

module.exports = routes;