'use strict';

(function() {

class ImportController {

  constructor($http, $scope, socket) {
    self = this;
    self.$http = $http;

    self.volunteerFile;
    self.volunteerArray;
  }

  processVolunteerData() {
      console.log(self.volunteerFile);
      Papa.parse(self.volunteerFile, {
        header: true,
        dynamicTyping: true,
        complete: function(res) {
          self.volunteerArray = res.data;
          self.uploadVolunteers();
        }
      });
  }

  showVolunteerData() {
      console.log(self.volunteerArray);
  }

  uploadVolunteers() {
    console.log(self.volunteerArray[0]);
    //for (var i = 0; i < self.volunteerArray.length; i++) {
      self.$http.post('/api/volunteers/', self.volunteerArray[0]);
    //}
  }



}

angular.module('ulyssesCreatorsApp')
  .controller('ImportController', ImportController)

})();
