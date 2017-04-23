'use strict';

const HttpStatus = require('http-status');
const ApiBinding = require('discovery-proxy').ApiBinding;
const Proxy = require('discovery-proxy').Proxy;
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

describe('create-georecording-test', () => {
  let locationService;
  let tenantedDbName = 'norman';
  let tenantedDbUrl = `mongodb://localhost:27017/${tenantedDbName}`;
  let clearTenantedDB  = require('mocha-mongoose')(tenantedDbUrl, { noClear: true });

  before((done) => {
    startLocationService().then((server) => {
      locationService = server;
      done();
    });
  });

  it('shall return 201 on geoRecording creation', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid geofence data
        let geoFenceEntry = serviceTestHelper.createTestGeoFence();

        service.api.geoFence.saveGeoFence({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoFence: geoFenceEntry,
        }, (geoFence) => {
          if (geoFence.status === HttpStatus.CREATED) {
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

  it('shall return 201 and required data on geoFence creation', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid geofence data
        let geoFenceEntry = serviceTestHelper.createTestGeoFence();

        service.api.geoFence.saveGeoFence({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoFence: geoFenceEntry,
        }, (geoFence) => {
          if (geoFence.status === HttpStatus.CREATED) {
            if (geoFence.obj.id && geoFence.obj.coordinates
                && geoFence.obj.ticketId && geoFence.obj.callbackUrl) {
              done();
            } else {
              done(new Error('Expected 200 and valid data'));
            }
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
