'use strict';
const model = require('location-model');
const Promise = require('promise');
const BaseService = require('./baseService').BaseService;

class GeoRecordingService extends BaseService {
  constructor(tenantedDb) {
    super();
    this.tenantedDb = tenantedDb;
  }

  isValidId(id) {
    return super.isValidId(this.tenantedDb.model.GeoRecording.repo, id);
  }

  validateResource(geoRecording) {
    let p = new Promise((resolve, reject) => {
      if (geoRecording.coordinates && geoRecording.heading &&
         geoRecording.speed && geoRecording.ticketId) {
        resolve(true);
      } else {
        resolve(false);
      } 
    });
    return p;
  }

  pageGeoRecordings(query, limit, offset) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.GeoRecording.repo.page(query, limit, offset);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoRecording Repo in tenanted db'));
      });
      return p;
    }
  }

  saveGeoRecording(geoRecording) {
    if (this.tenantedDb) {
      geoRecording.timestamp = Date.now();
      return this.tenantedDb.model.GeoRecording.repo.save(geoRecording);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoRecording Repo in tenanted db'));
      });
      return p;
    }
  }

  updateGeoRecording(geoRecordingId, geoRecording) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.GeoRecording.repo.update(geoRecordingId, geoRecording);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoRecording Repo in tenanted db'));
      });
      return p;
    }
  }

  findGeoRecordingById(id) {
    if (this.tenantedDb) {
      if (this.isValidId(id)) {
        return this.tenantedDb.model.GeoRecording.repo.findById(id);
      } else {
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Id'));
        });
      }
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Inflight Repo in tenanted db'));
      });
      return p;
    }
  }
}

module.exports.GeoRecordingService = GeoRecordingService;
