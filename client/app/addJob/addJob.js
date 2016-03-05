'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addJob', {
        url: '/addJob',
        templateUrl: 'app/addJob/addJob.html',
        controller: 'AddJobCtrl',
        controllerAs: 'addjob'
      });
  });
