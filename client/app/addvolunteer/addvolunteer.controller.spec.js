'use strict';

describe('Controller: AddvolunteerCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var AddvolunteerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddvolunteerCtrl = $controller('AddvolunteerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
