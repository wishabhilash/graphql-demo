'use strict';

const Campaign = require('api/resolvers/campaign');

const _resolvers = {
	campaigns: function(args, context) {
		return new Campaign(context.req.db);
	}
}


module.exports = _resolvers;