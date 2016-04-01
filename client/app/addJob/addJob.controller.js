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
      self.startTimeMinutes = "0" + 0;
      self.startTimeAMPM = "AM";

      self.endTimeHours = "12";
      self.endTimeMinutes = "0" + 0;
      self.endTimeAMPM = "AM";

      self.shiftLengthHours = "1";
      self.shiftLengthMinutes = "0" + 0;

      self.trainingOverlapHours = "0";
      self.trainingOverlapMinutes = "10";

      self.startTimeHoursArray = [];
      self.MinutesArray = [];
      self.LengthHoursArray = [];

      self.shifts = [];



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
        array.push(i.toString());
      }
      return array;
	}

    toMilitaryTime(str){
      if(str === "1200AM") {
        return 0;
      } else if(str === "1200PM"){
          return parseInt(str.substring(0,4));
      } else if(str.substring(str.length - 2, str.length) === "PM"){
          return parseInt(str.substring(0, str.length - 2)) + 1200;
      } else if(str.substring(str.length - 2, str.length) === "AM"){
        return parseInt(str.substring(0,str.length - 2));
      }

    }

    createShifts(t1, t2, shiftLength) {

    }



    uploadJob() {
        self.$http.post('/api/jobs/', {
            endTime: self.toMilitaryTime(self.endTimeHours + self.endTimeMinutes + self.endTimeAMPM),
            jobTitle: self.jobTitle,
            jobDescription: self.jobDescription,
            jobLocation: self.jobLocation,
            startTime: self.toMilitaryTime(self.startTimeHours + self.startTimeMinutes + self.startTimeAMPM),
            shiftLength: self.shiftLengthHours + self.shiftLengthMinutes,
            trainOverLap: self.trainOverLap
        });

        self.jobTitle = "";
        self.jobDescription = "";
        self.jobLocation = "";
        self.startTime = "";
        self.shiftLength = "";
        self.trainOverlap = "";

        self.startTimeHours = "12";
        self.startTimeMinutes = "0" + 0;
        self.startTimeAMPM = "AM";

        self.shiftLengthHours = "1";
        self.shiftLengthMinutes = "0" + 0;

        self.startTimeHours = "12";
        self.startTimeMinutes = "0" + 0;
        self.startTimeAMPM = "AM";

        self.trainingOverlapHours = "0";
        self.trainingOverlapMinutes = "10";
    }

  }

  angular.module('ulyssesCreatorsApp')
    .controller('addJobController', addJobController);

})();
