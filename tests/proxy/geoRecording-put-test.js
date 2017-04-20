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

describe('update-georecording-test', () => {
  let locationService;
  let tenantedDbName = 'montgomery';
  let tenantedDbUrl = `mongodb://localhost:27017/${tenantedDbName}`;
  let clearTenantedDB  = require('mocha-mongoose')(tenantedDbUrl, { noClear: true });

  before((done) => {
    startLocationService().then((server) => {
      locationService = server;
      done();
    });
  });

  it('shall return 404 on geoRecording update of unknown recording', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid geoRecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();
        service.api.geoRecording.updateGeoRecording({
          id: '58e66c7e09eb40b3b8a946d6',
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording) {
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
