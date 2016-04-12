'use strict';
(function(){

function VolunteerViewComponent($scope) {
  $scope.message = 'Hello';
}

angular.module('ulyssesCreatorsApp')
  .component('volunteerView', {
    templateUrl: 'app/volunteerView/volunteerView.html',
    controller: VolunteerViewComponent
  });

})();
