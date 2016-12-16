'use strict';

var ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

class Lesson {
	constructor(lesson) {
		this.lesson = lesson;
	}

	_id() {
		return this.lesson._id;
	}

	start_time() {
		return Math.round((new Date(this.lesson.start_time)).getTime()/1000);
	}

	end_time() {
		return Math.round((new Date(this.lesson.end_time)).getTime()/1000);
	}
}

module.exports = Lesson