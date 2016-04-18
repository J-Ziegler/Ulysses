'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  adminMenu = [{
    'title': 'Import',
    'state': 'import'
  },{
    'title': 'Add a Job',
    'state': 'addJob'
  },{
    'title': 'Add a Volunteer',
    'state': 'addvolunteer'
  },{
    'title':'Scheduler',
    'state':'scheduler'
  }];

  volunMenu = [{
    'title':'Volunteer View',
    'state':'volunteerView'
  },{
    'title':'Job View',
    'state':'jobView'
  },{
    'title': 'Map',
    'state': 'map'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('ulyssesCreatorsApp')
  .controller('NavbarController', NavbarController);
