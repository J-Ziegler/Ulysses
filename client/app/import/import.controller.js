'use strict';

(function() {

class ImportController {

  constructor($http, $scope, socket) {
    self = this;
    this.$http = $http;

    self.volunteerFile;
    self.parsedVolunteerCSV;
  }

  processVolunteerData() {
      console.log(self.volunteerFile)
      Papa.parse(self.volunteerFile, {header: true, dynamicTyping: true, complete: function(res) {self.parsedVolunteerCSV = res.data;}});
  }

  showVolunteerData() {
      console.log(self.parsedVolunteerCSV);
  }



}

angular.module('ulyssesCreatorsApp')
  .controller('ImportController', ImportController)

})();
