'use strict';

describe('Component: VolunteerViewComponent', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var VolunteerViewComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    VolunteerViewComponent = $componentController('VolunteerViewComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
