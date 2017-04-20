'use strict';
const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const GeoRecordingService = require(appRoot + '/libs/services/geoRecording').GeoRecordingService;
const debug = require('debug')('location-service');

const GetCurrentContext = require('app-context').GetCurrent;

const pageGeoRecordings = (app) => {
  return (req, res) => {
    let queryString = req.params.query;
    let query = {};
    if (queryString) {
      query = JSON.parse(queryString);
    }

    let limit = req.params.limit;
    let offset = req.params.offset;

    // Validate Query
    let tenantedDb = GetCurrentContext().get('db');
    let geoRecordingService = new GeoRecordingService(tenantedDb);

    geoRecordingService.pageGeoRecordings(query, limit || 10, offset || 0).then((pageResults) => {
      res.status(HttpStatus.OK).send(pageResults);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const saveGeoRecording = (app) => {
  return (req, res) => {
    let geoRecording = req.body;

    // Validate geoRecording
    let tenantedDb = GetCurrentContext().get('db');
    let geoRecordingService = new GeoRecordingService(tenantedDb);
    geoRecordingService.validateResource(geoRecording).then((isValid) => {
      if (isValid) {
        return geoRecordingService.saveGeoRecording(geoRecording);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'GeoRecording Invalid').writeResponse(res);
      }
    }).then((geoRecording) => {
      res.status(HttpStatus.CREATED).send(geoRecording);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const updateGeoRecording = (app) => {
  return (req, res) => {
    let geoRecordingId = req.params.id;
    let geoRecording = req.body;

    // Validate geoRecording
    let tenantedDb = GetCurrentContext().get('db');
    let geoRecordingService = new GeoRecordingService(tenantedDb);

    geoRecordingService.validateResource(geoRecording).then((isValid) => {
      if (isValid) {
        return geoRecordingService.updateGeoRecording(geoRecordingId, geoRecording);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid GeoRecording');
      }
    }).then((validGeoRecording) => {
      if (validGeoRecording) {
        res.status(HttpStatus.OK).send(validGeoRecording);
      } else {
        new ServiceError(HttpStatus.NOT_FOUND, 'Not Found - Unable to update GeoRecording').writeResponse(res);
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
exports.saveGeoRecording = saveGeoRecording;
exports.updateGeoRecording = updateGeoRecording;
exports.pageGeoRecordings = pageGeoRecordings;
