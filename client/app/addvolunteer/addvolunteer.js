'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addvolunteer', {
        url: '/addvolunteer',
        templateUrl: 'app/addvolunteer/addvolunteer.html',
        controller: 'addVolunteerController',
        controllerAs: 'addVolunteer'
      });
  });
