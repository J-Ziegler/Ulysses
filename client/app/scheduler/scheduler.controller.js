'use strict';

(function() {

  class SchedulerController {

    constructor($http, $scope, socket) {
      self = this;
      self.$http = $http;

      self.volunteers = [];
      self.arr = self.volunteers; // Placeholder name for the array containing volunteers after we transform them.
      //self.jobs = [];
      self.jobs = [];

      $http.get('/api/volunteers').then(response => {
        this.volunteers = response.data;
        socket.syncUpdates('volunteer', this.volunteers);
      });

      /*$http.get('/api/jobs').then(response => {
        this.jobs = response.data;
        socket.syncUpdates('job', this.jobs);
      }); */
    }

    createFakeData() {

    }
//deal with job length stuff by randomly breaking up jobs a lot...
    makeJobs() {
      for (var i = 0; i < 100; i++) {
        var a = parseInt(Math.random() * 100)
        self.jobs.push({'jobTitle': i, 'startTime': a, 'endTime': a + parseInt(Math.random() * 4 + 1)})
      }
      //person structure {'_id': i,'commitments':[],'preferences':[]}}
      //commitment {'name': i, 'start':n1,'end':n2}
      //preference {'thing':j,'magnitude':m}
    }

    generateSchedule() {
      for(var j = 0; j < self.jobs.length; j++) {
        for(var v = 0; v < self.arr.length; v++) {
          if (insertJob(j,v)) {break;}
        }
      }
    }

  insertJob(j,v){
    //if not conflicts, insert and return true, else return false
    for (var i = 0; i<arr[v].commitments.length();i++){
      if (((self.jobs[j].startTime < arr[v].commitments[i].end)  && (self.jobs[j].startTime > arr[v].commitments[i].start)) ||
          ((self.jobs[j].endTime < arr[v].commitments[i].end)  && (self.jobs[j].endTime > arr[v].commitments[i].start)))
        return false;
    }
    self.arr[v].commitments.push(self.jobs[j]);
    return true;
  }



  }

angular.module('ulyssesCreatorsApp')
  .controller('SchedulerController', SchedulerController)

})();
