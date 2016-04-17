'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobView', {
        url: '/jobView',
        template: '<job-view></job-view>'
      });
  });
