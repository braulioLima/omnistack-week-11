const express = require('express');

const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post("/ongs", OngController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:incidentId', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;