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
  };
};

describe('update-ticket', () => {
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

  it('shall return 404 on update of unknown ticket', (done) => {
    new ServiceTestHelper().serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid ticket data
        let ticketEntry = createTestTicket();

        service.api.ticket.updateTicket({
          id: '58e66c7e09eb40b3b8a946d6',
          'X-Tenant-Id': 'picolo',
          'x-fast-pass': true,
          ticket: ticketEntry,
        }, (ticket) => {
          if (ticket) {
            done(new Error('Expected 404 response'));
          }
        }, (err) => {
          if (err.errObj) {
            if (err.errObj.status == HttpStatus.NOT_FOUND) {
              done();
            } else {
              done(new Error('Expected 404 response'));
            }
          } else {
            done(new Error('Expected 404 response'));
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
