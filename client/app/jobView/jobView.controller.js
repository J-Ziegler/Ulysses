'use strict';
(function(){

function JobViewComponent($scope) {
  $scope.message = 'Hello';
}

angular.module('ulyssesCreatorsApp')
  .component('jobView', {
    templateUrl: 'app/jobView/jobView.html',
    controller: JobViewComponent
  });

})();
