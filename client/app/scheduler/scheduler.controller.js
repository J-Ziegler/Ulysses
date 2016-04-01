'use strict';

(function() {

  class SchedulerController {

    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      self.volunteers = [];
      self.arr = []; // Placeholder name for the array containing volunteers after we transform them.
      self.bestSchedule = [];
      self.bestRating = Number.MAX_SAFE_INTEGER;
      //self.jobs = [];
      self.jobs = [];
      self.shifts = [];

      $http.get('/api/volunteers').then(response => {
        this.volunteers = response.data;
        socket.syncUpdates('volunteer', self.volunteers);
        $scope.$watch('volunteer', (self.arr = self.makeVolunteers()))
      });

      $http.get('/api/jobs').then(response => {
       this.jobs = response.data;
       socket.syncUpdates('job', self.jobs);
       $scope.$watch('job', (self.shifts = self.jobsToShifts(self.jobs)))
       });

      self.makeJobs();
    }

    //jobsArray should be the list of jobs pulled from the DB as of this comment.
    jobsToShifts(jobsArray) {
      var shiftsArray
      for (var j = 0; j < jobsArray.length; j++) { // j because we are iterating though jobs
        for (var s = 0; s < jobsArray[j].shifts.length; s++) {
          shiftsArray.push({_id: jobsArray[j]._id,
                            start: jobsArray[j].shifts[s].shiftStart,
                            end: jobsArray[j].shifts[s].shiftEnd})
        }
        console.log(j);
      }
      return shiftsArray;
    }

//deal with job length stuff by randomly breaking up jobs a lot...
    makeJobs() {
      for (var i = 0; i < 100; i++) {
        var a = parseInt(Math.random() * 1199)
        self.jobs.push({'_id': i, 'start': a, 'end': a + parseInt(Math.random() * 1199)})
      }
      //person structure {'_id': i,'commitments':[],'preferences':[]}}
      //commitment {'name': i, 'start':n1,'end':n2}
      //preference {'thing':j,'magnitude':m}
    }

    makeVolunteers() {
      var fakeV = []; // Array of fake volunteers
      for (var i = 0; i < 20; i++) {
        var a = parseInt(Math.random() * 100)
        fakeV.push({_id: self.volunteers[i]._id, commitments: [], preferences: []});
      }
      //person structure {'_id': i,'commitments':[],'preferences':[]}}
      //commitment {'name': i, 'start':n1,'end':n2}
      //preference {'thing':j,'magnitude':m}

      return fakeV;
    }

    makeSchedules() {
      var rating = 0;
      for (var i = 0; i < 1000; i++) {
        self.generateSchedule();
        //(rating = self.rateSchedule() &&
        //console.log(rating));
        if (self.rateSchedule() < self.bestRating) {
          self.bestRating = self.rateSchedule();
          self.bestSchedule = self.arr;
        //  console.log(self.arr);
          console.log(self.rateSchedule());
        }
        self.clearVolunteerAssignments();
        self.shuffleArray(self.jobs);
        self.shuffleArray(self.volunteers);
      }
      console.log("----------")
      console.log(self.bestRating);
      console.log(self.bestSchedule);
    }

    // TODO: Fix this.
    clearVolunteerAssignments() {
      for(var i = 0; i < self.arr.length; i++) {
        self.arr[i].commitments = [];
      }
    }

    generateSchedule() {
      var w = 0;
      for (var j = 0; j < self.jobs.length; j++) {
        for (var v = 0; v <= self.arr.length; v++) {
          if (self.insertJob(j, ((v + w) % self.arr.length))) {
            w = v + 1;
            break;
          }
        }
      }
    }

    insertJob(j, v) {
      //if not conflicts, insert and return true, else return false
      for (var c = 0; c < self.arr[v].commitments.length; c++) {
        if (((self.jobs[j].start > self.arr[v].commitments[c].start) && (self.jobs[j].start < self.arr[v].commitments[c].end)) ||
            ((self.jobs[j].end   > self.arr[v].commitments[c].start) && (self.jobs[j].end   < self.arr[v].commitments[c].end))) {
          return false;
        }
      }
      self.arr[v].commitments.push(self.jobs[j]);
      return true;
    }

    checkAllJobsAssigned() {
      var sum = 0;
      for (var i = 0; i < self.arr.length; i++) {
        sum += self.arr[i].commitments.length;
      }
      return self.jobs.length - sum;
    }

    shuffleArray(arr) {
      var temp;
      var rand;
      for (var i = 0; i < arr.length; i++) {
        rand = Math.floor(Math.random() * arr.length);
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
      return arr;
    }

    //person structure {'_id': i,'commitments':[],'preferences':[]}}
    //commitment {'name': i, 'start':n1,'end':n2}
    //preference {'thing':j,'magnitude':m}

    rateSchedule() { // schedule is an array, probably maybe.
      var schedule = self.arr;
      var score = 0;

      for(var i = 0; i < schedule.length; i++){
        score = score + self.personMetric(schedule[i]);
      }
      score = score + (5 * self.checkAllJobsAssigned());
      return score;
      //self.print(score);
    }


    personMetric(person){
      return person.commitments.length * person.commitments.length;
    }


    print(arg){
      console.log(arg);
    }
  }

angular.module('ulyssesCreatorsApp')
  .controller('SchedulerController', SchedulerController)
})();
