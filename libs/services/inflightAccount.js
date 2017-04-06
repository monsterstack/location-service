'use strict';
const model = require('location-model');
const Promise = require('promise');

class InflightAccountService {
	constructor(tenantedDb) {
		this.tenantedDb = tenantedDb;
	}

	isValidId(id) {
		return this.tenantedDb.model.InflightAccount.repo.InflightAccount.repo.isValidId(id);
	}

	saveAccount(account) {
		if (this.tenantedDb) {
			return this.tenantedDb.model.InflightAccount.repo.save(account);
		} else {
			let p = new Promise((resolve, reject) => {
				reject(new Error('Missing Inflight Repo in tenanted db'));
			});
			return p;
		}
	}

	updateAccount(account) {
		if (this.tenantedDb) {
			return this.tenantedDb.model.InflightAccount.repo.update(account);
		} else {
			let p = new Promise((resolve, reject) => {
				reject(new Error('Missing Inflight Repo in tenanted db'));
			});
			return p;
		}
	}

	findAccountById(id) {
		if (this.tenantedDb) {
			if( this.isValidId(id)) {
				return this.tenantedDb.model.InflightAccount.repo.findById(id);
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

module.exports.InflightAccountService = InflightAccountService;
