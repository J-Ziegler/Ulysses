'use strict';

(function() {

  class SchedulerController {

    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      self.volunteers = [];
      self.arr = []; // Placeholder name for the array containing volunteers after we transform them.
      //self.jobs = [];
      self.jobs = [];

      $http.get('/api/volunteers').then(response => {
        this.volunteers = response.data;
        socket.syncUpdates('volunteer', this.volunteers);
        $scope.$watch('volunteer', (self.arr = self.makeVolunteers()))
      });

      /*$http.get('/api/jobs').then(response => {
       this.jobs = response.data;
       socket.syncUpdates('job', this.jobs);
       }); */

      self.makeJobs();
    }

//deal with job length stuff by randomly breaking up jobs a lot...
    makeJobs() {
      for (var i = 0; i < 100; i++) {
        var a = parseInt(Math.random() * 1199)
        self.jobs.push({'jobTitle': i, 'start': a, 'end': a + parseInt(Math.random() * 1199)})
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

      console.log("Volunteers: " + fakeV);

      return fakeV;
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
      console.log(self.arr);
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
      console.log(sum === self.jobs.length); // Sees if all the jobs are put into people.
      return self.jobs.length - sum;
    }

    shuffleArray(arr) {
      self.print(arr);
      var temp;
      var rand;
      for (var i = 0; i < arr.length; i++) {
        rand = Math.floor(Math.random() * arr.length);
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
        self.print(arr);
      }
      return arr;
    }

    //person structure {'_id': i,'commitments':[],'preferences':[]}}
    //commitment {'name': i, 'start':n1,'end':n2}
    //preference {'thing':j,'magnitude':m}

    rateSchedule(schedule) { // schedule is an array, probably maybe.
      schedule = self.arr;
      var score = 0;
      for(var i = 0; i < schedule.length; i++){
        score = score + self.personMetric(schedule[i]);
      }
      score = score + (5 * self.checkAllJobsAssigned());
      console.log(score);
    }


    personMetric(person){
      return person.commitments.length * person.commitments.length;
    }


    print(arg){
      //console.log(arg);
    }
  }

angular.module('ulyssesCreatorsApp')
  .controller('SchedulerController', SchedulerController)
})();
