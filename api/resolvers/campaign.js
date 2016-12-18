'use strict';

const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const Product = require('api/resolvers/product');
const Lesson = require('api/resolvers/lesson');


class Campaign {
	constructor(campaign) {
		this.campaign = campaign
	}

	_id() {
		return this.campaign._id;
	}

	product(args, ctx) {
		let db = ctx.req.db;
		return db.collection('product').findOne({
			'_id': new ObjectId(this.campaign._product_id)
		}).then(function(product) {
			return new Product(product);
		});
	}

	lessons() {
		let lessonArr = [];
		_.each(this.campaign.lessons, function(lesson) {
			lessonArr.push(new Lesson(lesson))
		});
		return lessonArr;
	}
}


module.exports = Campaign