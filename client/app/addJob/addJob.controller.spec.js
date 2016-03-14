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

  it('should be able to make an array of hours', function() {
      expect(addJobController.makeHourArray()).toEqual([1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12]);
  });

  it('should be able to make a zero-based array of hours', function() {
      expect(addJobController.makeLengthHourArray()).toEqual([0,1,2,3,4,5,6,7,8,9,10,11,12]);
  });

  it('should be able to make an array of minutes', function() {
      expect(addJobController.makeMinuteArray()).toEqual(
          ['00','01','02','03','04','05','06','07','08','09','10','11','12','13',
           '14','15','16','17','18','19','20','21','22','23','24','25','26','27',
           '28','29','30','31','32','33','34','35','36','37','38','39','40','41',
           '42','43','44','45','46','47','48','49','50','51','52','53','54','55',
           '56','57','58','59']);
  });
});
