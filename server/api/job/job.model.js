'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var JobSchema = new mongoose.Schema({
  endTime: Number,
  jobTitle: String,
  jobDescription: String,
  jobLocation: String,
  startTime: Number,
  shiftLength: String,
  trainOverLap: String
});

export default mongoose.model('Job', JobSchema);
