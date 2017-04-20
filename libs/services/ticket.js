'use strict';
const model = require('location-model');
const Promise = require('promise');
const BaseService = require('./baseService').BaseService;

class TicketService extends BaseService {
  constructor(tenantedDb) {
    super();
    this.tenantedDb = tenantedDb;
  }

  isValidId(id) {
    return super.isValidId(this.tenantedDb.model.Ticket.repo, id);
  }

  validateResource(ticket) {
    let p = new Promise((resolve, reject) => {
      if (ticket.inflightAccountId &&
        ticket.startTime &&
        ticket.ttl &&
        ticket.destination) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    return p;
  }

  pageTickets(query, limit, offset) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.Ticket.repo.page(query, limit, offset);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Ticket Repo in tenanted db'));
      });
      return p;
    }
  }

  saveTicket(ticket) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.Ticket.repo.save(ticket);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Ticket Repo in tenanted db'));
      });
      return p;
    }
  }

  updateTicket(ticketId, ticket) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.Ticket.repo.update(ticketId, ticket);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Ticket Repo in tenanted db'));
      });
      return p;
    }
  }

  findTicketById(id) {
    if (this.tenantedDb) {
      if (this.isValidId(id)) {
        return this.tenantedDb.model.Ticket.repo.findById(id);
      } else {
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Id'));
        });
      }
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Ticket Repo in tenanted db'));
      });
      return p;
    }
  }
}

// Public
module.exports.TicketService = TicketService;
