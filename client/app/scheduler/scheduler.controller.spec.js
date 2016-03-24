'use strict';

describe('Controller: SchedulerCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var SchedulerController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchedulerController = $controller('SchedulerController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
