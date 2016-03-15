'use strict';

(function() {

class ImportController {

  constructor($http, $scope, socket) {
    self = this;
    self.$http = $http;

    self.disableImportButton = '';
    self.importButtonText = "Upload";
    self.importButtonType = "btn-primary";

    self.volunteerFile;
    self.volunteerArray;
  }

  processVolunteerData() {
      if(self.disableImportButton !== 'disabled') {
          console.log("Importing Data File...");
          Papa.parse(self.volunteerFile, {
            header: true,
            dynamicTyping: true,
            complete: function(res) {
              self.volunteerArray = res.data;
              self.uploadVolunteers();
              self.disableImportButton = 'disabled';
              self.importButtonText = "Data Imported!";
              self.importButtonType = "btn-default";
            }
          });
      }
  }

  uploadVolunteers() {
    console.log("Uploading Volunteers to the Database...");
    for (var i = 0; i < self.volunteerArray.length; i++) {
      var v = self.volunteerArray[i]; // local reference to current volunteer
      self.$http.post('/api/volunteers/', {
          coachEmail: v['Coach E-mail'],
          coachName: v['Coach name'],
          division: v['Division'],
          email: v['E-mail'],
          firstName: v['First name'],
          trainingAt: v['I will attend training at'],
          jobPreference1: v['Job Preference #1'],
          jobPreference2: v['Job Preference #2'],
          lastName: v['Last name'],
          lunchPreference: v['Lunch preference'],
          membershipName: v['M.name'],
          membershipRegion: v['M.region'],
          membershipNumber: v['Membership#'],
          problem: v['Problem'],
          region: v['Region'],
          tShirt: v['T-shirt'],
          assoc: v['assoc'],
          assocExp: v['assoc_exp'],
          childTeam: v['child_team'],
          city: v['city'],
          coachExp: v['coach_exp'],
          comment: v['comment'],
          country: v['country'],
          current: v['current'],
          fax: v['fax'],
          jobComment: v['job_comment'],
          memberExp: v['member_exp'],
          modifyOn: v['modify_on'],
          phone: v['phone'],
          positionsHeld: v['position_helds'],
          state: v['state'],
          street1: v['street1'],
          street2: v['street2'],
          submitDate: v['submitDate'],
          username: v['username'],
          workPhone: v['workphone'],
          zip: v['zip']
      });
    }
  }



}

angular.module('ulyssesCreatorsApp')
  .controller('ImportController', ImportController)

})();
