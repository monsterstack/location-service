'use strict';

const createModelFactory = require('location-model').model.createModelFactory;
const controller = require('../controllers/geoFences.controller.js');

module.exports = (app) => {
  app.get('/api/v1/geofences/:id',
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.findGeoFenceById(app));

  app.get('/api/v1/geofences',
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.pageGeoFences(app));

  /**
   * @swagger
   * /geofences:
   *  post:
   *    description: Save GeoFence
   *    operationId: saveGeoFence
   *    tags:
   *      - geoFence
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: geoFence
   *        description: GeoFence
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoFence'
   *        in: body
   *        required: true
   *      - name: X-Tenant-Id
   *        description: Tenant Id
   *        type: string
   *        in: header
   *        required: false
   *      - name: x-fast-pass
   *        description: Bypass Auth
   *        type: boolean
   *        in: header
   *        require: false
   *    responses:
   *      201:
   *        description: GeoFence
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoFence'
   *      409:
   *        description: Conflict
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Error'
   *      500:
   *        description: Internal Error
   *        type: object
   *        schema:
   * 		  $ref: '#/definitions/Error'
   */
  app.post('/api/v1/geofences',
         app.authCheck.fastPass(),
         app.authCheck.authCheck(),
         app.realizationCheck.dependenciesAreRealized(),
         app.tenantDbCreation.tenantDb(createModelFactory()),
         controller.saveGeoFence(app));
};
