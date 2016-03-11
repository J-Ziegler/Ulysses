'use strict';

(function() {

class ImportController {

  constructor($http, $scope, socket) {
    self = this;
    self.$http = $http;

    self.disableImportButton = '';
    self.importButtonText = "Upload";
    self.importButtonType = "btn-primary";

    self.volunteerFile;
    self.volunteerArray;
  }

  processVolunteerData() {
      if(self.disableImportButton !== 'disabled') {
          console.log("Importing Data File...");
          Papa.parse(self.volunteerFile, {
            header: true,
            dynamicTyping: true,
            complete: function(res) {
              self.volunteerArray = res.data;
              self.uploadVolunteers();
              self.disableImportButton = 'disabled';
              self.importButtonText = "Data Imported!";
              self.importButtonType = "btn-default";
            }
          });
      }
  }

  uploadVolunteers() {
    console.log("Uploading Volunteers to the Database...");
    for (var i = 0; i < self.volunteerArray.length; i++) {
      self.$http.post('/api/volunteers/', self.volunteerArray[i]);
    }
  }



}

angular.module('ulyssesCreatorsApp')
  .controller('ImportController', ImportController)

})();
