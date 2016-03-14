'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.volunteers = [];
    this.jobs = [];

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

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('ulyssesCreatorsApp')
  .controller('MainController', MainController);

})();
