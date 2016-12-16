'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');


class Product {
	constructor(db, productId) {
		this.product = db.collection('product').findOne({
			'_id': new ObjectId(productId)
		});
	}

	_id() {
		return this.product.then(function(a) {
			return a._id;
		});
	}

	short_slug() {
		return this.product.then(function(a) {
			return a.short_slug;
		});
	}

	ultimate() {
		return this.product.then(function(a) {
			return a.ultimate;
		});
	}

	timezone() {
		return this.product.then(function(a) {
			return a.timezone;
		});
	}

	language_id() {
		return this.product.then(function(a) {
			return a._language_id;
		});
	}

	slug() {
		return this.product.then(function(a) {
			return a.slug;
		});
	}

	name() {
		return this.product.then(function(a) {
			return a.name;
		});
	}
}

module.exports = Product