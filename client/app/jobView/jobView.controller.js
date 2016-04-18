'use strict';
(function() {

  class jobViewController {

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
    }

    militaryToHuman(mTime) {
        var h = parseInt(mTime / 100) % 12;
        var m = parseInt(mTime % 100);
        var am = "AM";

        if (h === 0) {
            h = 12
        }

        if (mTime > 1200) {
            am = "PM"
        }

        if (m < 10) {
            m = "0" + m;
        }

        return h + ":" + m + am;
    }


  }

  angular.module('ulyssesCreatorsApp')
    .controller('jobViewController', jobViewController);

})();
