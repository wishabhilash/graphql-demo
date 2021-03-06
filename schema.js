typeDefinitions = `
	type Course {
		_id: ID!
		slug: String
		faculty: String
		name: String
		org: String
		logo: String
		course_color: String
		is_advanced_course: Boolean
		products(id: ID, short_slug: String, timezone: String, ultimate: Boolean, language_id: String, slug: String, skip: Int, limit: Int): [Product]
	}

	type Assignment {
		link: String
		name: String
	}

	type Product {
	    _id : ID! 
	    course : Course 
	    short_slug : String 
	    ultimate : Boolean 
	    timezone : String 
	    language_id : String 
	    slug : String 
	    name : String
	    campaigns(id: ID, start_date: Int, end_date: Int, is_on_demand: Boolean, skip: Int, limit: Int): [Campaign]
	}
	
	type Lesson {
		_id: ID!
		key: String
		number: Int
		kind: String
		name: String
		start_time: Int
		end_time: Int
		vimeo_embed_code: Int
	}
	
	type Campaign {
		_id: ID!
		start_date: Int
		end_date: Int
		is_on_demand: Boolean
		name: String
		product: Product
		lessons(id: ID, kind: String, start_time: Int, end_time: Int): [Lesson]
	}

	type Query {
		campaign(id: ID): Campaign
		campaigns(id: ID, start_date: Int, end_date: Int, is_on_demand: Boolean, skip: Int, limit: Int): [Campaign]
	}

	type Mutation {
		setOnDemandCampaign(id: ID!, is_on_demand: Boolean!): Campaign
	}

	schema {
		query: Query,
		mutation: Mutation
	}
`

module.exports = typeDefinitions;