'use strict';
const Promise = require('promise');
const uuid = require('node-uuid');
const ApiBinding = require('discovery-proxy').ApiBinding;

class ServiceTestHelper {
  createServiceDescriptor(server) {
    return {
      endpoint: `http://localhost:${server.getApp().listeningPort}`,
      schemaRoute: '/swagger.json',
      _id: uuid.v1(),
    };
  }

  serviceTestApiBinding(server) {
    let service = this.createServiceDescriptor(server);
    let apiBinding = new ApiBinding(service);
    return apiBinding.bind();
  };

  createTestGeoRecording() {
    return {
      speed: 10,
      heading: 90,
      coordinates: [32.4544444, 21.333333],
      ticketId: '12312312312332',
    };
  };

  createTestGeoFence() {
    return {
      ticketId: 'dddddd',
      callbackUrl: 'http://mycllbck.com/111111',
      coordinates: [[32.4544444, 21.333333]],
    };
  };

  createTestInflightAccount() {
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

}

// Public
module.exports.ServiceTestHelper = ServiceTestHelper;
