'use strict';
const ApiBinding = require('discovery-proxy').ApiBinding;
const assert = require('assert');

// Location Api Binding Test Cases
describe('location-api-binding', () => {
  let Server = require('core-server').Server;
  let server = null;

  /**
   * Before every test we need to do the following:
   * 1. Launch an instance of LocationService - port number specified in test/config/default.json
   */
  before((done) => {
    server = new Server("LocationService", null, null, {});

    server.init().then(() => {
      server.loadHttpRoutes();
      server.listen().then(() => {
        console.log('Up and running..');
        done();
      }).catch((err) => {
        console.log(err);
        done();
      });
    }).catch((err) => {
      console.log(err);
      done();
    });

  });

  /**
   * This test makes sure all the api(s) for LocationService are available via
   * ApiBinding.  Note the stubbed minimal ServiceDescriptor for ApiBinding.
   * It is assumed the LocationService is serving up a valid swagger.json that
   * accurately described the operations / tags supported by the LocationService.
   */
  it('api created when binding occurs', (done) => {

    let service = {
      endpoint: 'http://localhost:10616',
      schemaRoute: '/swagger.json'
    };
    console.log("Creating Binding");
    let apiBinding = new ApiBinding(service);

    apiBinding.bind().then((service) => {
      console.log(`Checking Api...`);
      if(service.api === undefined) {
        done(new Error("Api is null"));
      } else if(service.api.health === undefined) {
        done(new Error("Health Api is null"));
      } else {
        done();
      }
    }).catch((err) => {
      assert(err === undefined, "Error didn't occur");
      done();
    });

  }).timeout(2000);

  after(() => {

  });

});
