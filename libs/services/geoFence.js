'use strict';
const model = require('location-model');
const Promise = require('promise');
const BaseService = require('./baseService').BaseService;

class GeoFenceService extends BaseService {
  constructor(tenantedDb) {
    super();
    this.tenantedDb = tenantedDb;
  }

  isValidId(id) {
    return super.isValidId(this.tenantedDb.model.GeoFence.repo, id);
  }

  validateResource(geoFence) {
    let p = new Promise((resolve, reject) => {
      resolve(true);
    });
    return p;
  }

  pageGeoFences(query, limit, offset) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.GeoFence.repo.page(query, limit, offset);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoFence Repo in tenanted db'));
      });
      return p;
    }
  }

  saveGeoFence(geoFence) {
    if (this.tenantedDb) {
      geoFence.timestamp = Date.now();
      return this.tenantedDb.model.GeoFence.repo.save(geoFence);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoFence Repo in tenanted db'));
      });
      return p;
    }
  }

  updateGeoFence(geoFenceId, geoFence) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.GeoFence.repo.update(geoFenceId, geoFence);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoFence Repo in tenanted db'));
      });
      return p;
    }
  }

  findGeoFenceById(id) {
    if (this.tenantedDb) {
      if (this.isValidId(id)) {
        return this.tenantedDb.model.GeoFence.repo.findById(id);
      } else {
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Id'));
        });
      }
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing GeoFence Repo in tenanted db'));
      });
      return p;
    }
  }
}

module.exports.GeoFenceService = GeoFenceService;
