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

	type Product {
	    _id : ID! 
	    course : Course 
	    short_slug : String 
	    ultimate : Boolean 
	    timezone : String 
	    _language_id : String 
	    slug : String 
	    name : String
	    campaigns: [Campaign]
	}

	type Campaign {
		_id: ID!
		product: Product
	}

	type Query {
		campaigns: [Campaign]
	}

	schema {
		query: Query
	}
`

module.exports = typeDefinitions;