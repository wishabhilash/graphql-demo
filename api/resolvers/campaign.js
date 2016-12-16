'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const Product = require('api/resolvers/product');
const Lesson = require('api/resolvers/lesson');


class Campaign {
	constructor(db) {
		this.campaign = db.collection('campaign').findOne();
	}

	_id() {
		return this.campaign.then(function(a) {
			return a._id;
		});
	}

	product() {
		return this.campaign.then(function(a) {
			return new Product(a._product_id);
		});
	}

	lessons() {
		return this.campaign.then(function(a) {
			let lessonArr = [];
			_.each(a.lessons, function(lesson) {
				lessonArr.push(new Lesson(lesson))
			});
			return lessonArr;
		});
	}
}


module.exports = Campaign