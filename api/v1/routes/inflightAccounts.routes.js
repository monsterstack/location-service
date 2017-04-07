'use strict';

const createModelFactory = require('location-model').model.createModelFactory;
const controller = require('../controllers/inflightAccounts.controller.js');

module.exports = (app) => {
  /**
   * @swagger
   * /accounts:
   *  post:
   *    description: Save Inflight Account
   *    operationId: saveAccount
   *    tags:
   *      - account
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: account
   *        description: InflightAccount
   *        type: object
   *        schema:
   *          $ref: '#/definitions/InflightAccount'
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
   *        description: InflightAccount
   *        type: object
   *        schema:
   *          $ref: '#/definitions/InflightAccount'
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
  app.post('/api/v1/accounts',
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.saveAccount(app));

  /**
   * @swagger
   * /accounts:
   *  put:
   *    description: Update Inflight Account
   *    operationId: updateAccount
   *    tags:
   *      - account
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: account
   *        description: InflightAccount
   *        type: object
   *        schema:
   *          $ref: '#/definitions/InflightAccount'
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
   *      200:
   *        description: InflightAccount
   *        type: object
   *        schema:
   *          $ref: '#/definitions/InflightAccount'
   *      409:
   *        description: Conflict
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Error'
   *      500:
   *        description: Internal Error
   *        type: object
   *        schema:
   *  	  $ref: '#/definitions/Error'
   */
  app.put('/api/v1/accounts',
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.updateAccount(app));

  /**
     * @swagger
     * /accounts/{id}:
     *  get:
     *    description: Find Inflight Account By Id
     *    operationId: findAccountById
     *    tags:
     *      - account
     *    produces:
     *      - application/json
     *    consumes:
     *      - application/json
    *    parameters:
     *      - name: id
     *        description: Account Id
     *        type: string
     *        in: path
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
     *      200:
     *        description: InflightAccount
     *        type: object
     *        schema:
     *          $ref: '#/definitions/InflightAccount'
     *      404:
     *        description: Not Found
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Error'
     *      500:
     *        description: Internal Error
     *        type: object
     *        schema:
     * 		  $ref: '#/definitions/Error'
     */
  app.get('/api/v1/accounts/:id',
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.findAccountById(app));
};
