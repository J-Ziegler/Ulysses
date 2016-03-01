'use strict';

angular.module('ulyssesCreatorsApp', [
  'ulyssesCreatorsApp.auth',
  'ulyssesCreatorsApp.admin',
  'ulyssesCreatorsApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
