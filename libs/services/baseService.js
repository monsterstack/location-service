'use strict';
let Promise = require('promise');

class BaseService {
  isValidId(repo, id) {
    return repo.isValidId(id);
  }

  /**
   * Validate Resource 
   * Default implementation resolves to true
   * @param {object} resource 
   */
  validateResource(resource) {
    let p = new Promise((resolve, reject) => {
      resolve(false);
    });
    return p;
  }
};

// Public
module.exports.BaseService = BaseService;
