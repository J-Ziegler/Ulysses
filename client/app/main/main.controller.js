'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.volunteers = [];
    this.jobs = [];
    this.schedules = [];
    this.selected = "";

    $http.get('/api/volunteers').then(response => {
      this.volunteers = response.data;
      socket.syncUpdates('volunteer', this.volunteers);
    });

    $http.get('/api/jobs').then(response => {
      this.jobs = response.data;
      socket.syncUpdates('job', this.jobs);
    });

    $http.get('/api/schedules').then(response => {
      this.schedules = response.data;
      socket.syncUpdates('schedule', this.schedules);
    });
  }

  expandDetails(item){
    if (this.selected === "") {
      this.selected = item['_id']
    } else {
      this.selected = "";
    }
    item.show = !item.show;
  };

  getVolunteerSchedule(id) {
    console.log(this.schedules[0].schedule);
    //console.log(this.schedules.rating);
    for (var i = 0; i < this.schedules[0].schedule.length; i++) {
      if(this.schedules[0].schedule[i]._id === id) {
        return this.schedules[0].schedule[i].commitments;
      }
    }
  }



}

angular.module('ulyssesCreatorsApp')
  .controller('MainController', MainController);

})();
