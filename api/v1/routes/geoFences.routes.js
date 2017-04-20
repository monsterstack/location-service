'use strict';

const createModelFactory = require('location-model').model.createModelFactory;
const controller = require('../controllers/geoFences.controller.js');

module.exports = (app) => {
  app.get('/api/v1/geofences/:id', controller.findGeoFenceById(app));
  app.get('/api/v1/geofences', controller.pageGeoFences(app));
  app.post('/api/v1/geofences', controller.saveGeoFence(app));
};
