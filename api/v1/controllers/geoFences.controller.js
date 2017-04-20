'use strict';
const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const GeoFenceService = require(appRoot + '/libs/services/geoFence').GeoFenceService;
const debug = require('debug')('location-service');

const GetCurrentContext = require('app-context').GetCurrent;

const findGeoFenceById = (app) => {
  return (req, res) => {
    let id = req.params.id;

    // Validate Fence
    let tenantedDb = GetCurrentContext().get('db');
    let geoFenceService = new GeoFenceService(tenantedDb);

    geoFenceService.findGeoFenceById(id).then((geoFence) => {
      res.status(HttpStatus.OK).send(geoFence);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const pageGeoFences = (app) => {
  return (req, res) => {
    let queryString = req.params.query;
    let query = {};
    if (queryString) {
      query = JSON.parse(queryString);
    }

    let limit = req.params.limit;
    let offset = req.params.offset;

    // Validate Query
    let tenantedDb = req.db;
    let geoFenceService = new GeoFenceService(tenantedDb);

    geoFenceService.pageGeoFences(query, limit || 10, offset || 0).then((pageResults) => {
      res.status(HttpStatus.OK).send(pageResults);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const saveGeoFence = (app) => {
  return (req, res) => {
    let geoFence = req.body;

    // Validate geoFence
    let tenantedDb = req.db;
    let geoFenceService = new GeoFenceService(tenantedDb);
    geoFenceService.validateResource(geoFence).then((isValid) => {
      if (isValid) {
        return geoFenceService.saveGeoFence(geoFence);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'GeoFence Invalid').writeResponse(res);
      }
    }).then((geoFence) => {
      res.status(HttpStatus.CREATED).send(geoFence);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const updateGeoFence = (app) => {
  return (req, res) => {
    let geoFenceId = req.params.id;
    let geoFence = req.body;

    // Validate geoFence
    let tenantedDb = req.db;
    let geoFenceService = new GeoFenceService(tenantedDb);

    geoFenceService.validateResource(geoFence).then((isValid) => {
      if (isValid) {
        return geoFenceService.updateGeoFence(geoFenceId, geoFence);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid GeoFence');
      }
    }).then((validGeoFence) => {
      if (validGeoFence) {
        res.status(HttpStatus.OK).send(validGeoFence);
      } else {
        new ServiceError(HttpStatus.NOT_FOUND, 'Not Found - Unable to update GeoFence').writeResponse(res);
      }
    }).catch((err) => {
      if (err instanceof ServiceError) {
        err.writeResponse(res);
      } else {
        new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error').writeResponse(res);
			}
    });
  };
};

// Public
exports.saveGeoFence = saveGeoFence;
exports.updateGeoFence = updateGeoFence;
exports.pageGeoFences = pageGeoFences;
exports.findGeoFenceById = findGeoFenceById;
