'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

class Course {
	constructor(course) {
		this.course = course;
	}

	_id() {
		return this.course._id;
	}

	slug() {
		return this.course.slug;
	}

	faculty() {
		return this.course.faculty;
	}

	name() {
		return this.course.name;
	}

	org() {
		return this.course.org;
	}

	logo() {
		return this.course.logo;
	}

	course_color() {
		return this.course.course_color;
	}

	is_advanced_course() {
		return this.course.is_advanced_course;
	}
}

module.exports = Course