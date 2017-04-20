'use strict';

const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const TicketService = require(appRoot + '/libs/services/ticket').TicketService;
const model = require('location-model');
const debug = require('debug')('location-service');

const GetCurrentContext = require('app-context').GetCurrent;

const mongoose = require('mongoose');

const pageTickets = (app) => {
  return (req, res) => {
    let queryString = req.params.query;
    let query = {};
    if (queryString) {
      query = JSON.parse(queryString);
    }

    let limit = req.params.limit;
    let offset = req.params.offset;

    // Validate Query
    let tenantedDb = GetCurrentContext().get('db');
    let ticketService = new TicketService(tenantedDb);

    ticketService.pageTickets(query, limit || 10, offset || 0).then((pageResults) => {
      res.status(HttpStatus.OK).send(pageResults);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const saveTicket = (app) => {
  return (req, res) => {
    let ticket = req.body;

    // Validate ticket
    let tenantedDb = GetCurrentContext().get('db');
    let ticketService = new TicketService(tenantedDb);
    ticketService.validateResource(ticket).then((isValid) => {
      if (isValid) {
        return ticketService.saveTicket(ticket);
      } else {
        throw new ServiceError(HttpStatus.BAD_REQUEST, 'Ticket Invalid');
      }
    }).then((savedTicket) => {
      res.status(HttpStatus.CREATED).send(savedTicket);
    }).catch((err) => {
      if (err instanceof ServiceError) {
        err.writeResponse(res);
      } else {
        new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
      }
    });
  };
};

const updateTicket = (app) => {
  return (req, res) => {
    let id = req.params.id;
    let ticket = req.body;

    // Validate ticket
    let tenantedDb = GetCurrentContext().get('db');
    let ticketService = new TicketService(tenantedDb);

    ticketService.validateResource(ticket).then((isValid) => {
      if (isValid) {
        return ticketService.updateTicket(ticketId, ticket);
      }
    }).then((validTicket) => {
      if (validTicket) {
        res.status(HttpStatus.OK).send(validTicket);
      } else {
        new ServiceError(HttpStatus.NOT_FOUND, 'Not Found - Unable to update ticket').writeResponse(res);
      }
    }).catch((err) => {
      if (err instanceof ServiceError) {
        err.writeResponse(res);
      } else {
        new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
      }
    });
  };
};

const findTicketById = (app) => {
  return (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid Id Format').writeResponse(res);
    } else {
      let tenantedDb = GetCurrentContext().get('db');
      let ticketService = new TicketService(tenantedDb);
      ticketService.findTicketById(id).then((ticket) => {
          if (ticket) {
            res.status(HttpStatus.OK).send(ticket);
          } else {
            new ServiceError(HttpStatus.NOT_FOUND, 'Not Found').writeResponse(res);
          }
        }).catch((err) => {
        new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err.message).writeResponse(res);
      });
    }
  };
};

/* Public */
exports.saveTicket = saveTicket;
exports.updateTicket = updateTicket;
exports.findTicketById = findTicketById;
exports.pageTickets = pageTickets;
