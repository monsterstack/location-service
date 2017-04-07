'use strict';

const HttpStatus = require('http-status');
const ApiBinding = require('discovery-proxy').ApiBinding;
const Proxy = require('discovery-proxy').Proxy;
const startTestService = require('discovery-test-tools').startTestService;

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

const createTestInflightAccount = () => {
  return {
    firstName: 'Jorge',
    lastName: 'Masihy',
    onBehalfOfTitle: 'Ringos',
    onBehalfOfLogoUrl: 'http://logos.com/llll3',
    avatarUrl: 'http://logos.com/dfeqr',
    timestamp: Date.now(),
    ttl: 23213232,
  };
};

describe('Get Inflight Accounts', () => {
  let locationService;
  before((done) => {
    startLocationService().then((server) => {
          locationService = server;
          done();
        }).catch((err) => {
          done(err);
        });
  });

  it('Expect Http Status 404 on Find Account By Id', (done) => {
    let service = {
        endpoint: `http://localhost:${locationService.getApp().listeningPort}`,
        schemaRoute: '/swagger.json',
        _id: uuid.v1(),
      };

    let apiBinding = new ApiBinding(service);

    apiBinding.bind().then((service) => {
      if (service) {
        let accountEntry = createTestInflightAccount();

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

  after((done) => {
    locationService.getHttp().close();
    done();
  });
});
