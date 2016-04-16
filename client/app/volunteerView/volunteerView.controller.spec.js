'use strict';

describe('Controller: Volunteer View', function() {

  // load the controller's module
  beforeEach(module('ulyssesCreatorsApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var volunteerView;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/volunteers')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/jobs')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
      $httpBackend.expectGET('/api/schedules')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    volunteerView = $controller('volunteerViewController', {
      $scope: scope
    });
  }));

  it('should pass a dummy test', function() {
    $httpBackend.flush();
    expect(1).toBe(1);
  });
});
