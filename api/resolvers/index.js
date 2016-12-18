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

	campaigns: function({start, end}, ctx) {
		let db = ctx.req.db;

		let skip = start;
		let limit = end - start || end;

		let campaigns = db.collection('campaign').find();
		if (skip != undefined) campaigns = campaigns.skip(skip);
		if (limit != undefined) campaigns = campaigns.limit(limit);
		
		let campaignDocs = campaigns.toArray();
		return campaignDocs.then(function(campaigns) {
			let campaignArr = [];
			_.each(campaigns, function(campaign) {
				campaignArr.push(new Campaign(campaign));
			});
			return campaignArr;
		})
		
	}
}


module.exports = _resolvers;