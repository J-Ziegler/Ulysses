'use strict';

describe('Controller: ImportCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var importController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    importController = $controller('ImportController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
