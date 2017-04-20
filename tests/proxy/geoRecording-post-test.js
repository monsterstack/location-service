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
  let tenantedDbName = 'montgomery';
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
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
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

  it('shall return 201 and required data on geoRecording creation', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording.status === HttpStatus.CREATED) {
            if (geoRecording.obj.id && geoRecording.obj.coordinates
                && geoRecording.obj.speed && geoRecording.obj.heading) {
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

  it('shall return 400 on geoRecording creation with missing ticketId', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();
        delete geoRecordingEntry.ticketId;

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording.status !== HttpStatus.BAD_REQUEST) {
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

  it('shall return 400 on geoRecording creation with missing heading', (done) => {
    let serviceTestHelper = new ServiceTestHelper();

    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();
        delete geoRecordingEntry.heading;

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording.status !== HttpStatus.BAD_REQUEST) {
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

  it('shall return 400 on geoRecording creation with missing speed', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();
        delete geoRecordingEntry.speed;

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording.status !== HttpStatus.BAD_REQUEST) {
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

  it('shall return 400 on geoRecording creation with missing coordinates', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        //@TODO: Test with valid georecording data
        let geoRecordingEntry = serviceTestHelper.createTestGeoRecording();
        delete geoRecordingEntry.coordinates;

        service.api.geoRecording.saveGeoRecording({
          'X-Tenant-Id': tenantedDbName,
          'x-fast-pass': true,
          geoRecording: geoRecordingEntry,
        }, (geoRecording) => {
          if (geoRecording.status !== HttpStatus.BAD_REQUEST) {
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
