'use strict';

(function() {



  class addVolunteerController {



    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      }

    addVolunteer() {
      if (self.firstName) {
        self.$http.post('/api/volunteers', {firstName: self.firstName,lastName: self.lastName});
        self.firstName = '';
        self.lastName = '';
        self.email = '';
        self.assoc = '';
        self.jobPreference1 = '';
        self.jobPreference2 = '';
        self.phone = '';
        self.childTeam = '';
        console.log("We got to addVolunteer");
    }
  }




  }

  angular.module('ulyssesCreatorsApp')
    .controller('addVolunteerController', addVolunteerController);

})();
