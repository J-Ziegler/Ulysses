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

      self.startTimeHours = "7";
      self.startTimeMinutes = "0" + 0;
      self.startTimeAMPM = "AM";

      self.endTimeHours = "7";
      self.endTimeMinutes = "0" + 0;
      self.endTimeAMPM = "PM";

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


    makeShiftsFactorsArray(){
      var mendTime = self.toMilitaryTime(self.endTimeHours + self.endTimeMinutes + self.endTimeAMPM);
      var mstartTime = self.toMilitaryTime(self.startTimeHours + self.startTimeMinutes + self.startTimeAMPM);
      var tempshiftlengthsArray = self.calculateFactors(mendTime - mstartTime);
      var temp = [];
      for(var i =0 ; i < tempshiftlengthsArray.length; i++){
        temp.push(self.fixshiftLength(tempshiftlengthsArray[i]));
      }
     return temp;
    }


    numberofShifts(){
      var mendTime = self.toMilitaryTime(self.endTimeHours + self.endTimeMinutes + self.endTimeAMPM);
      var mstartTime = self.toMilitaryTime(self.startTimeHours + self.startTimeMinutes + self.startTimeAMPM);
      return (mendTime - mstartTime)/self.shiftLengthHours;
    }

    calculateFactors(n)
  {
    var num_factors = [], i;

    for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
      if (n % i === 0)
      {
        num_factors.push(i.toString());
        if (n / i !== i)
          num_factors.push((n / i).toString());
      }
    num_factors.sort(function(x, y)
    {
      return x - y;});  // numeric sort
    return num_factors;
  }

    fixshiftLength(str){
      if(str.length >= 2 && parseInt(str.substring(str.length -2,str.length)) > 59){
        var shiftLength = parseInt(str);
        shiftLength = shiftLength + 40;
        return shiftLength.toString();
      }
      return str;
    }

    createshiftsArray(){
      var mendTime = self.toMilitaryTime(self.endTimeHours + self.endTimeMinutes + self.endTimeAMPM);
      var mstartTime = self.toMilitaryTime(self.startTimeHours + self.startTimeMinutes + self.startTimeAMPM);
      var shiftsArray = [];
      for(var i= 0; i < self.numberofShifts(); i++){
        self.shifts.push({'_id':self.jobTitle,'start' :mstartTime +(self.shiftLengthHours * i),'end': mstartTime +(self.shiftLengthHours * i)+ parseInt(self.shiftLengthHours),'numberofVolunteers':0})
      }
      return self.shifts;


  }
    toMilitaryTime(str) {
      if (str === "1200AM") {
        return 0;
      } else if (str === "1200PM") {
        return parseInt(str.substring(0, 4));
      } else if (str.substring(str.length - 2, str.length) === "PM") {
        return parseInt(str.substring(0, str.length - 2)) + 1200;
      } else if (str.substring(str.length - 2, str.length) === "AM") {
        return parseInt(str.substring(0, str.length - 2));
      }
    }



    uploadJob() {
        self.$http.post('/api/jobs/', {
            endTime: self.toMilitaryTime(self.endTimeHours + self.endTimeMinutes + self.endTimeAMPM),
            jobTitle: self.jobTitle,
            jobDescription: self.jobDescription,
            jobLocation: self.jobLocation,
            startTime: self.toMilitaryTime(self.startTimeHours + self.startTimeMinutes + self.startTimeAMPM),
            shiftLength: self.shiftLengthHours + self.shiftLengthMinutes,
            trainOverLap: self.trainOverLap,
            shifts: self.shifts
        });

        self.jobTitle = "";
        self.jobDescription = "";
        self.jobLocation = "";
        self.startTime = "";
        self.shiftLength = "";
        self.trainOverlap = "";

        self.startTimeHours = "7";
        self.startTimeMinutes = "0" + 0;
        self.startTimeAMPM = "AM";

        self.shiftLengthHours = "1";
        self.shiftLengthMinutes = "0" + 0;

        self.endTimeHours = "7";
        self.endTimeMinutes = "0" + 0;
        self.endTimeAMPM = "PM";

        self.trainingOverlapHours = "0";
        self.trainingOverlapMinutes = "10";
        self.shifts = [];
    }

  }

  angular.module('ulyssesCreatorsApp')
    .controller('addJobController', addJobController);

})();
/*toRadix60(N) {
 var HexN="", Q=Math.floor(Math.abs(N)), R;
 while (true) {
 R=Q%60;
 HexN = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ".charAt(R);
 + HexN;
 Q=(Q-R)/radix;
 if (Q==0) break;
 }
 return HexN;
 }

 goBack(N) {
 var n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ".indexOf(N);
 if (n<10){
 return "0" + n.toString();
 }else{
 return n.toString();
 }
 }

 doThing(S){
 var S1 = S.split('');
 var S2 = "";
 for(var i = 0;i<S1.length;i++){
 S2 = S2 + self.goBack(S1[i]);
 }
 return S2;
 }

 doThingBetter(stuff){return self.doThing(self.toRadix60(stuff));}

 calculateFactors(n)
 {
 var num_factors = [], i;

 for (i = 1; i <= Math.floor(Math.sqrt(n)); i = i + 1)
 if (n % i === 0)
 {
 num_factors.push(i.toString());
 if (n / i !== i)
 num_factors.push((n / i));
 }
 num_factors.sort(function(x, y)
 {
 return x - y;});  // numeric sort
 var numbers = [];
 for(var i = 0;i<num_factors.length;i++){
 numbers.push(self.doThingBetter(num_factors[i]));
 }
 //return num_factors;
 return numbers;
 }*/
