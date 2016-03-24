'use strict';

describe('Controller: addJobController', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var addVolunteerController, scope, $httpBackend, postSuccess = false;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    addVolunteerController = $controller('addVolunteerController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
