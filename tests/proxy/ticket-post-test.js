'use strict';

const HttpStatus = require('http-status');
const startTestService = require('discovery-test-tools').startTestService;
const ServiceTestHelper = require('../helpers/serviceTestHelper').ServiceTestHelper;

const uuid = require('node-uuid');

/**
 * Start Location Service
 */
const startLocationService = () => {
  let p = new Promise((resolve, reject) => {
    startTestService('LocationService', {}, (err, server) => {
      resolve(server);
    });
  });
  return p;
};

const createTestTicket = () => {
  return {
    type: 'Ticket',
    inflightAccountId: 'dafewqfqewfewq',
    startTime: Date.now(),
    ttl: 3242342,
    timestamp: Date.now(),
    destination: {},
  };
};

describe('create-ticket', () => {
  let tenantedDbName = 'montague';
  let tenantedDbUrl = `mongodb://localhost:27017/${tenantedDbName}`;
  let clearTenantedDB  = require('mocha-mongoose')(tenantedDbUrl, { noClear: true });

  let locationService;
  before((done) => {
    startLocationService().then((server) => {
          locationService = server;
          done();
        }).catch((err) => {
          done(err);
        });
  });

  it('shall return 201 on ticket creation', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        let ticketEntry = createTestTicket();
        service.api.ticket.saveTicket({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket.status === HttpStatus.CREATED) {
            done();
          } else {
            done(new Error('Expected 201 response'));
          }
        }, (err) => {
          done(err);
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  it('shall return 400 on ticket creation with missing accountId', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        let ticketEntry = createTestTicket();

        // Remove account id
        delete ticketEntry.inflightAccountId;
        service.api.ticket.saveTicket({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket.status !== HttpStatus.BAD_REQUEST) {
            done(new Error(`Expected 400 response and received ${ticket.status}`));
          } else {
            done();
          }
        }, (err) => {
          if (err.errObj) {
            if (err.errObj.status === HttpStatus.BAD_REQUEST) {
              done();
            } else {
              done(new Error('Expected 400 response'));
            }
          } else {
            done(err);
          }
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  it('shall return 400 on ticket creation with missing destination', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        let ticketEntry = createTestTicket();

        // Remove account id
        delete ticketEntry.destination;
        service.api.ticket.saveTicket({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket.status !== HttpStatus.BAD_REQUEST) {
            done(new Error(`Expected 400 response and received ${ticket.status}`));
          } else {
            done();
          }
        }, (err) => {
          if (err.errObj) {
            if (err.errObj.status === HttpStatus.BAD_REQUEST) {
              done();
            } else {
              done(new Error('Expected 400 response'));
            }
          } else {
            done(err);
          }
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  it('shall return 400 on ticket creation with missing ttl', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        let ticketEntry = createTestTicket();

        // Remove account id
        delete ticketEntry.ttl;
        service.api.ticket.saveTicket({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket.status !== HttpStatus.BAD_REQUEST) {
            done(new Error(`Expected 400 response and received ${ticket.status}`));
          } else {
            done();
          }
        }, (err) => {
          if (err.errObj) {
            if (err.errObj.status === HttpStatus.BAD_REQUEST) {
              done();
            } else {
              done(new Error('Expected 400 response'));
            }
          } else {
            done(err);
          }
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  it('shall return 400 on ticket creation with missing startTime', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        let ticketEntry = createTestTicket();

        // Remove account id
        delete ticketEntry.startTime;
        service.api.ticket.saveTicket({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket.status !== HttpStatus.BAD_REQUEST) {
            done(new Error(`Expected 400 response and received ${ticket.status}`));
          } else {
            done();
          }
        }, (err) => {
          if (err.errObj) {
            if (err.errObj.status === HttpStatus.BAD_REQUEST) {
              done();
            } else {
              done(new Error('Expected 400 response'));
            }
          } else {
            done(err);
          }
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  after((done) => {
    if (locationService)
      locationService.getHttp().close();

    // I hate christmas trees
    clearTenantedDB((err) => {
      if (err) done(err);
      else {
        done();
      }
    });
  });
});
