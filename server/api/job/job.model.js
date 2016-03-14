'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var JobSchema = new mongoose.Schema({
  endTime: String,
  jobTitle: String,
  jobDescription: String,
  jobLocation: String,
  startTime: String,
  shiftLength: String,
  trainOverLap: String
});

export default mongoose.model('Job', JobSchema);
