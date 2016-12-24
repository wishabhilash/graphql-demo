'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const Course = require('api/resolvers/course');


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

	course(args, ctx) {
		let db = ctx.req.db;
		return db.collection('course').findOne({
			'_id': new ObjectId(this.product._course_id)
		}).then(function(course) {
			return new Course(course);
		});
	}

}

module.exports = Product