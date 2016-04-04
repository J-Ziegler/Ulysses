'use strict';

import mongoose from 'mongoose';

var ScheduleSchema = new mongoose.Schema({
  schedule: Array,
  rating: Number
});

export default mongoose.model('Schedule', ScheduleSchema);
