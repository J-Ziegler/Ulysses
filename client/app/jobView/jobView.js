'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobView', {
        url: '/jobView',
        templateUrl: 'app/jobView/jobView.html',
        controller: 'jobViewController',
        controllerAs: 'jobView'
      });
  });
