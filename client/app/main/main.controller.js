'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.volunteers = [];
    this.jobs = [];
    this.selected = "";

    $http.get('/api/volunteers').then(response => {
      this.volunteers = response.data;
      socket.syncUpdates('volunteer', this.volunteers);
    });

    $http.get('/api/jobs').then(response => {
      this.jobs = response.data;
      socket.syncUpdates('job', this.jobs);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  expandDetails(volunteer){
    if (this.selected === "") {
      this.selected = volunteer['_id']
    } else {
      this.selected = "";
    }
    volunteer.show = !volunteer.show;
  };



}

angular.module('ulyssesCreatorsApp')
  .controller('MainController', MainController);

})();
