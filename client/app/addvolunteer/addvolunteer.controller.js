'use strict';

(function() {



  class addVolunteerController {



    constructor($http, $scope, socket) {
      var self = this;
      self.$http = $http;

      }

    addVolunteer() {
      if (self.firstName) {
        self.$http.post('/api/volunteers', {firstName: self.firstName,lastName: self.lastName});
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
        self.slots = [];
        console.log("We got to addVolunteer");
    }
  }




  }

  angular.module('ulyssesCreatorsApp')
    .controller('addVolunteerController', addVolunteerController);

})();
