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
		return db.collection('Product').findOne({
			'_id': new ObjectId(this.campaign._product_id)
		}).then(function(product) {
			let a = new Product(product);
			console.log(a);
			return a;
		});
	}

	lessons({id, kind, start_time, end_time}, ctx) {
		let db = ctx.req.db;
		let args = {};
		if (id != undefined) args['_id'] = new ObjectId(id);
		if (start_time != undefined) args['start_time'] = new Date(start_time*1000);
		if (end_time != undefined) args['end_time'] = new Date(end_time*1000);
		if (kind != undefined) args['kind'] = kind;
		
		let self = this;

		return db.collection('Lesson').find({
			'_campaign_id': new ObjectId(this.campaign._id)
		}).toArray().then(function(lessons) {
			let lessonArr = [];
			_.each(lessons, function(lesson) {
				if (self._is_subset(args, lesson))
					lessonArr.push(new Lesson(lesson));
			});
			return lessonArr;
		});
	}

	is_on_demand() {
		return this.campaign.is_on_demand;
	}

	start_date() {
		return Math.round((new Date(this.campaign.start_date)).getTime()/1000);
	}

	end_date() {
		return Math.round((new Date(this.campaign.end_date)).getTime()/1000);
	}

	name() {
		return this.campaign.name;
	}
}


module.exports = Campaign