'use strict';

describe('Component: JobViewComponent', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var jobViewController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    jobViewController = $controller('jobViewController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
