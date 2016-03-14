'use strict';

describe('Controller: addJobController', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var addJobController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    addJobController = $controller('addJobController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
