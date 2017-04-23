'use strict';

const createModelFactory = require('location-model').model.createModelFactory;
const controller = require('../controllers/geoRecordings.controller.js');

module.exports = (app) => {

  /**
   * @swagger
   * /georecordings:
   *  post:
   *    description: Save GeoRecording
   *    operationId: saveGeoRecording
   *    tags:
   *      - geoRecording
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: geoRecording
   *        description: GeoRecording
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoRecording'
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
   *        description: GeoRecording
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoRecording'
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
  app.post('/api/v1/georecordings',
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.saveGeoRecording(app));

  /**
   * @swagger
   * /georecordings/{id}:
   *  put:
   *    description: Update GeoRecording
   *    operationId: updateGeoRecording
   *    tags:
   *      - geoRecording
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: id
   *        description: Id of GeoRecording to update
   *        type: string
   *        in: path
   *        required: true
   *      - name: geoRecording
   *        description: GeoRecording
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoRecording'
   *        in: body
   *        required: true
   *      - name: X-Tenant-Id
   *        description: Tenant Id
   *        type: string
   *        in: header
   *        required: true
   *      - name: x-fast-pass
   *        description: Bypass Auth
   *        type: boolean
   *        in: header
   *        require: false
   *    responses:
   *      201:
   *        description: GeoRecording
   *        type: object
   *        schema:
   *          $ref: '#/definitions/GeoRecording'
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
  app.put('/api/v1/georecordings/:id',
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.updateGeoRecording(app));

  /**
   * @swagger
   * /georecordings:
   *  get:
   *    description: Page GeoRecordings
   *    operationId: page
   *    tags:
   *      - geoRecording
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: query
   *        description: Query String - default '{}'
   *        type: string
   *        in: query
   *        required: false
   *      - name: limit
   *        description: Limit - default 10
   *        in: query
   *        required: false
   *      - name: offset
   *        description: Offset - default 0
   *        in: query
   *        required: false
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
   *      200:
   *        description: PageResult
   *        type: object
   *        schema:
   *          $ref: '#/definitions/PageResult'
   *      500:
   *        description: Internal Error
   *        type: object
   *        schema:
   * 		  $ref: '#/definitions/Error'
   */
  app.get('/api/v1/georecordings',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.pageGeoRecordings(app));
};
