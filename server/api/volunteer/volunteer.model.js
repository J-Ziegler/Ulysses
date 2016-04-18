'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

// IMPORTANT NOTE!!! Seriously, read this.ch
// This data model DOES NOT include some fields from the original data.
// Excluded fields commented below.
var VolunteerSchema = new mongoose.Schema({
  coachEmail: String,
  coachName: String,
  division: Number,
  email: String,
  firstName: String,
  trainingAt: String,
  isJudge: Boolean,
  jobPreference1: String,
  jobPreference2: String,
  lastName: String,
  lunchPreference: String,
  membershipName: String,
  membershipRegion:  String,
  membershipNumber: Number,
  problem: Number,
  region:  String,
  tShirt:  String,
  assoc:  String,
  assocExp: Number,
  //'certNbr': Number,
  //'cert_p1':  String,
  //'cert_p2':  String,
  //'cert_p3':  String,
  //'cert_p4':  String,
  //'cert_p5':  String,
  //'cert_score':  String,
  //'cert_spont':  String,
  childTeam:  String,
  city:  String,
  coachExp: Number,
  comment:  String,
  couAmyntry:  String,
  current: String,
  fax:  String,
  jobComment:  String,
  memberExp: Number,
  modifyOn:  String,
  //'password':  String,
  phone: String,
  positionsHeld:  String,
  state:  String,
  street1:  String,
  street2:  String,
  submitDate:  String,
  username:  String,
  workPhone:  String,
  zip: Number
});

export default mongoose.model('Volunteer', VolunteerSchema);
