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
    startTestService('LocationService', {}/* options */, (err, server) => {
      resolve(server);
    });
  });
  return p;
}

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
}

describe('create-inflight-account', () => {
	let tenantedDbName = 'picolo';
	let tenantedDbUrl = `mongodb://localhost:27017/${tenantedDbName}`;
	let clearTenantedDB  = require('mocha-mongoose')(tenantedDbUrl, {noClear: true});


  let locationService;
	before((done) => {
		startLocationService().then((server) => {
			  locationService = server;
				done();
      }).catch((err) => {
        done(err);
      });
	});

	it('Expect Http Status 201 on Create Account', (done) => {
		let service = {
      endpoint: `http://localhost:${locationService.getApp().listeningPort}`,
      schemaRoute: '/swagger.json',
			_id: uuid.v1()
    };
		
    let apiBinding = new ApiBinding(service);

    apiBinding.bind().then((service) => {
      if (service) {
				//@TODO: Test with valid account data
				let accountEntry = createTestInflightAccount();

				service.api.account.saveAccount({
					'X-Tenant-Id': tenantedDbName,
					'x-fast-pass': true, 
					account: accountEntry
				}, (account) => {
					if (account.status === HttpStatus.CREATED) {
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

	after((done) => {
		if(locationService)
  		locationService.getHttp().close();
    // I hate christmas trees
    clearTenantedDB((err) => {
    	if(err) done(err);
      else {
      	done();
      }
  	});
  });
});
