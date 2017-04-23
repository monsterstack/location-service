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
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.saveAccount(app));

  /**
   * @swagger
   * /accounts/{id}:
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
   *      - name: id
   *        description: Id of InflightAccount to update
   *        type: string
   *        in: path
   *        required: true
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
   *      404:
   *        description: Not Found
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Error'
   *      500:
   *        description: Internal Error
   *        type: object
   *        schema:
   *  	      $ref: '#/definitions/Error'
   */
  app.put('/api/v1/accounts/:id',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
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
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.findAccountById(app));

  /**
     * @swagger
     * /accounts:
     *  get:
     *    description: Page Accounts
     *    operationId: page
     *    tags:
     *      - account
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
  app.get('/api/v1/accounts',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.pageAccounts(app));
};
