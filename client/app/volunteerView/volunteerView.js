'use strict';

angular.module('ulyssesCreatorsApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('volunteerView', {
        url: '/volunteerView',
        templateUrl: 'app/volunteerView/volunteerView.html',
        controller: 'volunteerViewController',
        controllerAs: 'volunteerView'
      });
  });
