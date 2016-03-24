'use strict';

angular.module('ulyssesCreatorsApp')
  .controller('addVolunteerCtrl', function ($scope) {
    $scope.message = 'Hello';
  });

var self = this;

self.addVolunteer = function(){
  if (self.firstName) {
    self.$http.post('/api/volunteers', {firstName: self.firstName,lastName: self.lastName});
    self.firstName = '';
    self.lastName = '';
  }
}
