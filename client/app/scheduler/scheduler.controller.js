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
        var a = parseInt(Math.random() * 100)
        self.jobs.push({'jobTitle': i, 'start': a, 'end': a + parseInt(Math.random() * 1199 + 1)})
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
      for (var j = 0; j < self.jobs.length; j++) {
        for (var v = 0; v < self.arr.length; v++) {
          if (self.insertJob(j, v)) {
            break;
          }
        }
      }
      console.log(self.arr);
    }

    getScore(person) {

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
      console.log(sum === self.jobs.length);
    }
  }

angular.module('ulyssesCreatorsApp')
  .controller('SchedulerController', SchedulerController)
})();
