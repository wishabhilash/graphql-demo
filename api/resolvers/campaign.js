'use strict';

const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const Product = require('api/resolvers/product');
const Lesson = require('api/resolvers/lesson');


class Campaign {
	constructor(campaign) {
		this.campaign = campaign
	}

	_is_subset(object1, object2) {
		let flag = true;
		_.each(object1, function (value, key) {
			if (object2[key] != null) {
				if (object2[key].toString() != value.toString()) flag = false;
			} else {
				flag = false;
			}
				
		})
		return flag;
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

	lessons({id, kind, start_time, end_time}) {
		let args = {};
		if (id != undefined) args['_id'] = new ObjectId(id);
		if (start_time != undefined) args['start_time'] = new Date(start_time*1000);
		if (end_time != undefined) args['end_time'] = new Date(end_time*1000);
		if (kind != undefined) args['kind'] = kind;
		
		let lessonArr = [];
		let self = this;

		_.each(this.campaign.lessons, function(lesson) {
			if (self._is_subset(args, lesson))
				lessonArr.push(new Lesson(lesson))
		});

		return lessonArr;
	}

	is_on_demand() {
		return this.campaign.is_on_demand;
	}
}


module.exports = Campaign