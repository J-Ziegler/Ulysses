'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('volunteerView', {
        url: '/volunteerView',
        template: '<volunteer-view></volunteer-view>'
      });
  });
