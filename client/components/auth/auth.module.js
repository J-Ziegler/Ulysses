'use strict';

angular.module('ulyssesCreatorsApp.auth', [
  'ulyssesCreatorsApp.constants',
  'ulyssesCreatorsApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
