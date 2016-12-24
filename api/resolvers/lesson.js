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

	vimeo_embed_code() {
		return this.lesson.recording.vimeo_embed_code;
	}

	key() {
		return this.lesson.key;
	}

	number() {
		return this.lesson.number;
	}

	kind() {
		return this.lesson.kind;
	}

	name() {
		return this.lesson.name;
	}
}

module.exports = Lesson