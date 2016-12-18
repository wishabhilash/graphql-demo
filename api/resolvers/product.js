'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');


class Product {
	constructor(product) {
		this.product = product;
	}

	_id() {
		return this.product._id;
	}

	short_slug() {
		return this.product.short_slug;
	}

	ultimate() {
		return this.product.ultimate;
	}

	timezone() {
		return this.product.timezone;
	}

	language_id() {
		return this.product._language_id;
	}

	slug() {
		return this.product.slug;
	}

	name() {
		return this.product.name;
	}
}

module.exports = Product