'use strict';

const createModelFactory = require('location-model').model.createModelFactory;
const controller = require('../controllers/tickets.controller.js');

module.exports = (app) => {
  /**
   * @swagger
   * /tickets:
   *  post:
   *    description: Save Ticket
   *    operationId: saveTicket
   *    tags:
   *      - ticket
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: ticket
   *        description: Ticket
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Ticket'
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
   *        description: Ticket
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Ticket'
   *      409:
   *        description: Conflict
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Error'
   *      400:
   *        description: Bad Request
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Error'
   *      500:
   *        description: Internal Error
   *        type: object
   *        schema:
   * 		  $ref: '#/definitions/Error'
   */
  app.post('/api/v1/tickets',
      app.authCheck.fastPass(),
      app.authCheck.authCheck(),
      app.realizationCheck.dependenciesAreRealized(),
      app.tenantDbCreation.tenantDb(createModelFactory()),
      controller.saveTicket(app));

  /**
   * @swagger
   * /tickets/{id}:
   *  put:
   *    description: Update Ticket
   *    operationId: updateTicket
   *    tags:
   *      - ticket
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    parameters:
   *      - name: id
   *        description: Ticket Id
   *        type: string
   *        in: path
   *        required: true
   *      - name: ticket
   *        description: Ticket
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Ticket'
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
   *        description: Ticket
   *        type: object
   *        schema:
   *          $ref: '#/definitions/Ticket'
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
   *  	  $ref: '#/definitions/Error'
   */
  app.put('/api/v1/tickets/:id',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.updateTicket(app));

  /**
     * @swagger
     * /tickets/{id}:
     *  get:
     *    description: Find Ticket By Id
     *    operationId: findTicketById
     *    tags:
     *      - ticket
     *    produces:
     *      - application/json
     *    consumes:
     *      - application/json
    *    parameters:
     *      - name: id
     *        description: Ticket Id
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
     *        description: Ticket
     *        type: object
     *        schema:
     *          $ref: '#/definitions/Ticket'
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
  app.get('/api/v1/tickets/:id',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.findTicketById(app));

  /**
    * @swagger
    * /tickets:
    *  get:
    *    description: Page Tickets
    *    operationId: page
    *    tags:
    *      - ticket
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
  app.get('/api/v1/tickets',
       app.authCheck.fastPass(),
       app.authCheck.authCheck(),
       app.realizationCheck.dependenciesAreRealized(),
       app.tenantDbCreation.tenantDb(createModelFactory()),
       controller.pageTickets(app));
};
