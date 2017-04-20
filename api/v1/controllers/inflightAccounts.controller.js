'use strict';

const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const InflightAccountService = require(appRoot + '/libs/services/inflightAccount').InflightAccountService;
const model = require('location-model');
const debug = require('debug')('location-service');
const GetCurrentContext = require('app-context').GetCurrent;

const mongoose = require('mongoose');

const pageAccounts = (app) => {
  return (req, res) => {
    let queryString = req.params.query;
    let query = {};
    if (queryString) {
      query = JSON.parse(queryString);
    }

    let limit = req.params.limit;
    let page = req.params.page;

    // Validate Query
    let tenantedDb = GetCurrentContext().get('db');
    let inflightAccountService = new InflightAccountService(tenantedDb);

    inflightAccountService.pageAccounts(query, page || 0, limit || 10).then((pageResults) => {
      res.status(HttpStatus.OK).send(pageResults);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const saveAccount = (app) => {
  return (req, res) => {
    let inflightAccount = req.body;

    // Validate account
    let tenantedDb = GetCurrentContext().get('db');
    let inflightAccountService = new InflightAccountService(tenantedDb);
    inflightAccountService.validateResource(inflightAccount).then((isValid) => {
      if (isValid) {
        return inflightAccountService.saveAccount(inflightAccount);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid Account');
      }
    }).then((account) => {
      res.status(HttpStatus.CREATED).send(account);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  };
};

const updateAccount = (app) => {
  return (req, res) => {
    let accountId = req.params.id;
    let inflightAccount = req.body;

    // Validate account
    let tenantedDb = GetCurrentContext().get('db');
    let inflightAccountService = new InflightAccountService(tenantedDb);

    inflightAccountService.validateResource(inflightAccount).then((isValid) => {
      if (isValid) {
        return inflightAccountService.updateAccount(accountId, inflightAccount);
      } else {
        return new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid Account');
      }
    }).then((account) => {
      if (account) {
        res.status(HttpStatus.OK).send(account);
      } else {
        new ServiceError(HttpStatus.NOT_FOUND, 'Not Found - Unable to Update').writeResponse(res);
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

const findAccountById = (app) => {
  return (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid Id Format').writeResponse(res);
    } else {
      let tenantedDb = GetCurrentContext().get('db');
      let inflightAccountService = new InflightAccountService(tenantedDb);
      inflightAccountService.findAccountById(id).then((account) => {
        if (account) {
          res.status(HttpStatus.OK).send(account);
        } else {
          new ServiceError(HttpStatus.NOT_FOUND, 'Not Found').writeResponse(res);
        }
      }).catch((err) => {
        new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err.message).writeResponse(res);
      });
    }
  };
};

/* Public */
exports.saveAccount = saveAccount;
exports.updateAccount = updateAccount;
exports.findAccountById = findAccountById;
exports.pageAccounts = pageAccounts;
