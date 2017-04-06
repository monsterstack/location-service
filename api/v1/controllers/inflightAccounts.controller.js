'use strict';

const appRoot = require('app-root-path');
const HttpStatus = require('http-status');
const ServiceError = require('core-server').ServiceError;
const InflightAccountService = require(appRoot + '/libs/services/inflightAccount').InflightAccountService;
const model = require('location-model');
const debug = require('debug')('location-service');

const mongoose = require('mongoose');

const saveAccount = (app) => {
  return (req, res) => {
		let account = req.body;

		// Validate account
    let tenantedDb = req.db;
    let inflightAccountService = new InflightAccountService(tenantedDb);
    inflightAccountService.saveAccount(account).then((savedAccount) => {
      res.status(HttpStatus.CREATED).send(savedAccount);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err).writeResponse(res);
    });
  }
}

const updateAccount = (app) => {
  return (req, res) => {
		let account = req.body;

		// Validate account
    let tenantedDb = req.db;
    let inflightAccountService = new InflightAccountService(tenantedDb);
    inflightAccountService.updateAccount(account).then((savedAccount) => {
      debug(savedAccount);
      res.status(HttpStatus.OK).send(savedAccount);
    }).catch((err) => {
      new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR, err.message).writeResponse(res);
    });
  }
}

const findAccountById = (app) => {
	return (req, res) => {
		let id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      new ServiceError(HttpStatus.BAD_REQUEST, 'Invalid Id Format').writeResponse(res);
    } else {
    let tenantedDb = req.db;
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
	}
}

/* Public */
exports.saveAccount = saveAccount;
exports.updateAccount = updateAccount;
exports.findAccountById = findAccountById;