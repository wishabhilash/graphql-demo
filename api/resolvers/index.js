'use strict';

const Campaign = require('api/resolvers/campaign');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const _resolvers = {
	campaign: function({id}, ctx) {
		let db = ctx.req.db;
		return db.collection('campaign')
			.findOne({"_id": new ObjectId(id)})
			.then(function(campaign) {
				return new Campaign(campaign);
			});
	},

	campaigns: function({id, start_date, end_date, is_on_demand, skip, limit}, ctx) {
		let db = ctx.req.db;
		let args = {};
		if (id != undefined) args['_id'] = new ObjectId(id);
		if (start_date != undefined) args['start_date'] = new Date(start_date);
		if (end_date != undefined) args['end_date'] = new Date(end_date);
		if (is_on_demand != undefined) args['is_on_demand'] = is_on_demand;


		let _skip = skip || 0;
		let _limit = limit || 10;

		let campaigns = db.collection('campaign').find(args);

		if (_skip != undefined) campaigns = campaigns.skip(_skip);
		if (_limit != undefined) campaigns = campaigns.limit(_limit);
		
		let campaignDocs = campaigns.toArray();
		return campaignDocs.then(function(campaigns) {
			let campaignArr = [];
			_.each(campaigns, function(campaign) {
				campaignArr.push(new Campaign(campaign));
			});
			return campaignArr;
		})
	},

	setOnDemandCampaign: function({id, is_on_demand}, ctx) {
		let db = ctx.req.db;
		return db.collection('campaign').updateOne({
			'_id': new ObjectId(id)
		}, {
			'$set': {'is_on_demand': is_on_demand}
		}).then(function(status) {
			return db.collection('campaign')
			.findOne({'_id': new ObjectId(id)});
		}).then(function(campaign) {
			return new Campaign(campaign);
		});
	}
}


module.exports = _resolvers;