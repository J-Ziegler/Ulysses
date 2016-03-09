'use strict';

(function() {



  class addJobController {



    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      self.jobTitle = "";
      self.jobDescription = "";
      self.jobLocation = "";
      self.startTime = "";
      self.shiftLength = "";
      self.trainOverlap = "";

      self.startTimeHours = "12";
      self.startTimeHoursArray = [];
      self.startTimeMinutes = "0" + 0;
      self.startTimeMinutesArray = [];
      self.startTimeAMPM = "AM";

      self.shiftLengthHours = "1";
      self.shiftLengthHoursArray = [];
      self.shiftLengthMinutes = "0" + 0;
      self.shiftLengthMinutesArray = [];

      self.trainingOverlapHours = "0";
      self.trainingOverlapHoursArray = [];
      self.trainingOverlapMinutes = "10";
      self.trainingOverlapMinutesArray = [];
    }

    makeHourArray(array){
      array=[];
      for(var i=1; i<=12; i++){
        array.push(i);
      }
      return array;
    }

    makeLengthHourArray(array){
      array=[];
      for(var i=0; i<=12; i++){
        array.push(i);
      }
      return array;
    }

    makeMinuteArray(array){
      array=[];
      for(var i=0; i<10; i++){
        array.push("0" + i);
      }
      for(var i=10; i<60; i++){
        array.push(i);
      }
      return array;
	}

    uploadJob() {
        self.$http.post('/api/jobs/', {
            jobTitle: self.jobTitle,
            jobDescription: self.jobDescription,
            jobLocation: self.jobLocation,
            startTime: self.startTime,
            shiftLength: self.shiftLength,
            trainOverLap: self.trainOverLap
        })

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
