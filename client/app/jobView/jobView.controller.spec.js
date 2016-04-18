'use strict';

describe('Component: JobViewComponent', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var JobViewComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    JobViewComponent = $componentController('JobViewComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
