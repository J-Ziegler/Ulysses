'use strict';

(function() {



  class addJobController {



    constructor($http, $scope, socket) {
      self = this;
      self.jobTitle = "";
      self.jobDescription = "";
      self.jobLocation = "";
      self.startTime = "";
      self.shiftLength = "";
      self.trainOverlap = "";
    }



  }

  angular.module('ulyssesCreatorsApp')
    .controller('addJobController', addJobController);

})();
