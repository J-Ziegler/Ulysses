'use strict';

describe('Controller: addJobController', function () {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));

  var addJobController, scope, $httpBackend, postSuccess = false;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
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

  it('should be able to create/upload a new job', function() {
      addJobController.jobTitle = "Test Job";
      addJobController.jobDescription = "This is a test!";
      addJobController.jobLocation = "A Test File";

      addJobController.startTimeHours = "12";
      addJobController.startTimeMinutes = "0" + 0;
      addJobController.startTimeAMPM = "AM";

      addJobController.shiftLengthHours = "1";
      addJobController.shiftLengthMinutes = "0" + 0;

      addJobController.startTimeHours = "12";
      addJobController.startTimeMinutes = "0" + 0;
      addJobController.startTimeAMPM = "AM";

      addJobController.trainingOverlapHours = "0";
      addJobController.trainingOverlapMinutes = "10";

      addJobController.uploadJob();

      expect(addJobController.jobTitle).toEqual('');
      expect(addJobController.jobDescription).toEqual('');
      expect(addJobController.jobLocation).toEqual('');
  });

  it('testing military time', function() {
    expect(addJobController.toMilitaryTime("1200AM")).toEqual(0);
    expect(addJobController.toMilitaryTime("1200PM")).toEqual(1200);
    expect(addJobController.toMilitaryTime("1000AM")).toEqual(1000);
    expect(addJobController.toMilitaryTime("1000PM")).toEqual(2200);
    expect(addJobController.toMilitaryTime("100PM")).toEqual(1300);
    expect(addJobController.toMilitaryTime("100AM")).toEqual(100);
  });

  it('testing calculateFactors', function() {
    expect(addJobController.calculateFactors(15)).toEqual(["1","3","5","15"]);
    expect(addJobController.calculateFactors(0)).toEqual([]);
    expect(addJobController.calculateFactors(13)).toEqual(["1","13"]);
    expect(addJobController.calculateFactors(1)).toEqual(["1"]);
  })
  it('testing creating calculateFactorsArray', function() {

    addJobController.startTimeHours = "12";
    addJobController.startTimeMinutes = "0" + 0;
    addJobController.startTimeAMPM = "PM";

    addJobController.endTimeHours = "4";
    addJobController.endTimeMinutes = "0" + 0;
    addJobController.endTimeAMPM = "PM";

    expect(addJobController.makeShiftsFactorsArray()).toEqual(["1","2","4","5","8","10","16","20","25","40","50","80","100","200","400"])


  });
  it('testing fixshiftLength', function() {
    expect(addJobController.fixshiftLength("290")).toEqual(330);
    expect(addJobController.fixshiftLength("90")).toEqual(130);
    expect(addJobController.fixshiftLength("59")).toEqual(59);

  });

});
