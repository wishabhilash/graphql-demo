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
		products: [Product]
	}

	type Assignment {
		link: String
		name: String
	}

	type Lesson {
		_id: ID!
		key: String
		number: Int
		kind: String
		name: String
		start_time: Int
		end_time: Int
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
	    campaigns: [Campaign]
	}

	type Campaign {
		_id: ID!
		start_date: Int
		end_date: Int
		is_on_demand: Boolean
		name: String
		product: Product
		lessons: [Lesson]
	}

	type Query {
		campaigns: Campaign
	}

	schema {
		query: Query
	}
`

module.exports = typeDefinitions;