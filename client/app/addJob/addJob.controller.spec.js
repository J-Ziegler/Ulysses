'use strict';

describe('Controller: AddJobCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var AddJobCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddJobCtrl = $controller('AddJobCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
