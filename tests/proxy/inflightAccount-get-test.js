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

describe('get-inflight-account', () => {
  let tenantedDb = 'picolo';
  let locationService;
  before((done) => {
    startLocationService().then((server) => {
          locationService = server;
          done();
        }).catch((err) => {
          done(err);
        });
  });

  it('shall return 404 on findById of unknown account', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        service.api.account.findAccountById({
          'X-Tenant-Id': 'picolo',
          'x-fast-pass': true,
          id: '58e66c7e09eb40b3b8a946d7',
        }, (account) => {
          if (account.status != HttpStatus.NOT_FOUND) {
            done(new Error(`Expected 404 response and received ${err.status}`));
          } else {
            done();
          }
        }, (err) => {
          if (err.status === HttpStatus.NOT_FOUND) {
            done();
          } else {
            done(new Error(`Expected 404 response and received ${err.status}`));
          }
        });
      } else {
        done(new Error('Received Null Location Service Binding'));
      }
    }).catch((err) => {
      done(err);
    });
  });

  it('shall return 200 with page descriptor', (done) => {
    let serviceTestHelper = new ServiceTestHelper();
    serviceTestHelper.serviceTestApiBinding(locationService).then((service) => {
      if (service) {
        service.api.account.page({
          'X-Tenant-Id': tenantedDb,
          'x-fast-pass': true,
        }, (pageResult) => {

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
        service.api.account.page({
          'X-Tenant-Id': tenantedDb,
          'x-fast-pass': true,
        }, (pageResult) => {

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
    locationService.getHttp().close();
    done();
  });
});
