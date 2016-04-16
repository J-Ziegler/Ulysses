'use strict';

(function() {



  class addVolunteerController {



    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      self.firstName = "";
      self.lastName = "";
      self.assoc = "";
      self.street1 = "";
      self.street2 = "";
      self.city = "";
      self.state = "";
      self.zip = "";
      self.country = "";
      self.region = "";
      self.phone = "";
      self.workPhone = "";
      self.email = "";
      self.fax = "";
      self.assocExp = "";
      self.coachExp = "";
      self.memberExp = "";
      self.username = "";
      self.password = "";
      self.current = "";
      self.jobPreference1 = "";
      self.jobPreference2 = "";
      self.membershipNumber = "";
      self.problem = "";
      self.division = "";
      self.submitDate = "";
      self.lastModified = "";
      self.mName = "";
      self.mRegion = "";
      self.childTeam = "";
      self.coachName = "";
      self.coachEmail = "";
      self.tshirtSize = "";
      self.positionHeld = "";
      self.comment = "";
      self.isJudge = false;
    }

    addVolunteer() {
      if (self.firstName) {
        self.$http.post('/api/volunteers', {
          coachEmail: self.coachEmail,
          coachName: self.coachName,
          division: parseInt(self.division),
          email: self.email,
          firstName: self.firstName,
          isJudge: self.isJudge,
          jobPreference1: self.jobPreference1, //TODO: Link this to the imported data list of preferences
          jobPreference2: self.jobPreference2,
          lastName: self.lastName,
          membershipName: self.mName,
          membershipRegion:  self.mRegion,
          membershipNumber: self.membershipNumber,
          problem: self.problem,
          region:  self.region,
          tShirt:  self.tshirtSize, //TODO: Make this a drop down?
          assoc:  self.assoc,
          assocExp: self.assocExp,
          childTeam:  self.childTeam,
          city:  self.city,
          coachExp: self.,
          comment:  String,
          country:  String,
          current: String,
          fax:  String,
          jobComment:  String,
          memberExp: Number,
          modifyOn:  String,
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
        self.firstName = "";
        self.lastName = "";
        self.assoc = "";
        self.street1 = "";
        self.street2 = "";
        self.city = "";
        self.state = "";
        self.zip = "";
        self.country = "";
        self.region = "";
        self.phone = "";
        self.workPhone = "";
        self.email = "";
        self.fax = "";
        self.assocExp = "";
        self.coachExp = "";
        self.memberExp = "";
        self.username = "";
        self.password = "";
        self.current = "";
        self.jobPreference1 = "";
        self.jobPreference2 = "";
        self.membershipNumber = "";
        self.problem = "";
        self.division = "";
        self.submitDate = "";
        self.lastModified = "";
        self.mName = "";
        self.mRegion = "";
        self.childTeam = "";
        self.coachName = "";
        self.coachEmail = "";
        self.tshirtSize = "";
        self.positionHeld = "";
        self.comment = "";
        self.isJudge = false;
        console.log("We got to addVolunteer");
    }
  }




  }

  angular.module('ulyssesCreatorsApp')
    .controller('addVolunteerController', addVolunteerController);

})();
