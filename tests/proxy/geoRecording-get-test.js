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

describe('get-georecording-test', () => {
  let tenantedDbName = 'montgomery';
  let tenantedDbUrl = `mongodb://localhost:27017/${tenantedDbName}`;
  let clearTenantedDB  = require('mocha-mongoose')(tenantedDbUrl, { noClear: true });

  let basicPageRequest = {
    'X-Tenant-Id': tenantedDbName,
    'x-fast-pass': true,
  };

  let locationService;
  before((done) => {
    startLocationService().then((server) => {
          locationService = server;
          done();
        }).catch((err) => {
          done(err);
        });
  });

  it('shall return 200 with page descriptor', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        service.api.geoRecording.page(basicPageRequest, (pageResult) => {
          if (pageResult && pageResult.obj) {
            if (pageResult.status === 200)
              done();
            else
              done(new Error('Expected Page Result with elements in page'));
          } else {
            done(new Error('Expected Page Result'));
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

  it('shall return elements field with page descriptor', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        service.api.geoRecording.page(basicPageRequest, (pageResult) => {

          if (pageResult && pageResult.obj) {
            if (pageResult.obj.docs)
              done();
            else
              done(new Error('Expected Page Result with elements in page'));
          } else {
            done(new Error('Expected Page Result'));
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
