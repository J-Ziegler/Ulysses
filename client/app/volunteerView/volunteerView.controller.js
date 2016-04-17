'use strict';
(function(){

  class volunteerViewController {


    constructor($http, $scope, socket) {
      self = this;
      this.$http = $http;
      this.volunteers = [];
      this.jobs = [];
      this.schedules = [];
      this.selected = "";
      this.editMode = false;

      //this is the variables the updating of the volunteer.
      this.coachEmail = "";
      this.coachName = "";
      this.division = 0;
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      this.trainingAt = "";
      this.isJudge = false;
      this.jobPreference1 = "";
      this.jobPreference2 = "";
      this.lunchPreference = "";
      this.membershipName = "";
      this.membershipRegion = "";
      this.membershipNumber = 0;
      this.problem = 0;
      this.region = "";
      this.tShirt = "";
      this.assoc = "";
      this.assocExp = "";
      this.childTeam = "";
      this.city = "";
      this.coachExp = 0;
      this.comment = "";
      this.country = "";
      this.current = "";
      this.fax = "";
      this.jobComment = "";
      this.memberExp =  0;
      this.modifyOn = "";
      this.phone = "";
      this.positionsHeld = "";
      this.state = "";
      this.street1 = "";
      this.street2 = "";
      this.submitDate = "";
      this.username = "";
      this.workPhone = "";
      this.zip = 0;


      $http.get('/api/volunteers').then(response => {
        this.volunteers = response.data;
        console.log("Volunteers loaded.");
        socket.syncUpdates('volunteer', this.volunteers);
      });

      $http.get('/api/jobs').then(response => {
        this.jobs = response.data;
        console.log("Jobs loaded.");
        socket.syncUpdates('job', this.jobs);
      });

      $http.get('/api/schedules').then(response => {
        this.schedules = response.data;
        console.log("Schedule loaded.");
        socket.syncUpdates('schedule', this.schedules);
      });
    }

    deleteVolunteer(volunteer){
      if(confirm("Are you sure that you want to delete " + volunteer.firstName + "?")) {
        console.log("Deleting " + volunteer.firstName + " " + volunteer.lastName + "...");
        self.removeJobsOfVolunteer(volunteer._id);
        self.removeFromVolunteers(volunteer._id);
        this.editMode = false;
        this.selected = ''
      } else {
        console.log("The volunteer has not been deleted.");
      }
    }

    removeJobsOfVolunteer(id) {
        console.log("Removing " + id + " from the schedule...");
        var s = self.schedules[0].schedule
        for (var i = 0; i < s.length; i++) {
            if (s[i]._id === id) {
                s.splice(i, 1);

                self.$http.put('/api/schedules/' + self.schedules._id, {
                    schedule: s,
                    rating: self.schedules[0].rating
                });
            }
        }
    }

    removeFromVolunteers(id) {
        console.log("Removing " + id + " from the volunteer database...");
        self.$http.delete('/api/volunteers/' + id);
    }

    editVolunteer(id){
      self.editMode = true;
      self.$http.get('/api/volunteers/' + id).then(response => {
        self.selected = response.data;
      });
    }

    saveEdits(volunteer){
      self.editMode = false;
      self.selected = ''

      this.coachEmail = document.getElementById('coachEmail').value;
      this.coachName = document.getElementById('coachName').value;
      this.division = document.getElementbyId('division').value;
      this.email = document.getElementById('email').value;
      this.firstName = document.getElementById('firstName').value;
      this.lastName = document.getElementById('lastName').value;
      this.trainingAt = document.getElementById('trainingAt').value;
      this.jobPreference1 = document.getElementById('jobPreference1').value;
      this.jobPreference2 = document.getElementById('jobPreference2').value;
      this.lunchPreference = document.getElementById('lunchPreference').value;
      this.membershipName = document.getElementById('membershipName').value;
      this.membershipRegion = document.getElementById('membershipRegion').value;
      this.membershipNumber = document.getElementById('membershipNumber').value;
      this.problem = document.getElementById('problem').value;
      this.region = document.getElementById('region').value;
      this.tShirt = document.getElementById('tShirt').value;
      this.assoc = document.getElementById('assoc').value;
      this.assocExp = document.getElementById('assocExp').value;
      this.childTeam = document.getElementById('childTeam').value;
      this.city = document.getElementById('city').value;
      this.coachExp = document.getElementById('coachExp').value;
      this.comment = document.getElementById('comment').value;
      this.country = document.getElementById('country').value;
      this.current = document.getElementById('current').value;
      this.fax = document.getElementById('fax').value;
      this.jobComment = document.getElementById('jobComment').value;
      this.memberExp =  document.getElementById('memberExp').value;
      this.modifyOn = document.getElementById('modifyOn').value;
      this.phone = document.getElementById('phone').value;
      this.positionsHeld = document.getElementById('positionsHeld').value;
      this.state = document.getElementById('state').value;
      this.street1 = document.getElementById('street1').value;
      this.street2 = document.getElementById('street2').value;
      this.submitDate = document.getElementById('submitDate').value;
      this.username = document.getElementById('username').value;
      this.workPhone = document.getElementById('workPhone').value;
      this.zip = document.getElementById('zip').value;

      //use an http.put to update all of the api Information, also need to add conditional statements to throw
      //pop ups if some of the information is not filled in. 

    }


    getVolunteerSchedule(id) {
      //console.log(this.schedules[0].schedule);
      //console.log(this.schedules.rating);
      for (var i = 0; i < this.schedules[0].schedule.length; i++) {
        if (this.schedules[0].schedule[i]._id === id) {
          return this.schedules[0].schedule[i].commitments;
        }
      }
    }

    getJobById(id) {
        for (var i = 0; i < self.jobs.length; i++) {
            if (self.jobs[i]._id === id) {
                return self.jobs[i];
            }
        }
    }

    militaryToHuman(militaryTime) {
        var h = "";
        var m = "";
        if (militaryTime.length === 3) {

        }
    }

  }

  angular.module('ulyssesCreatorsApp')
    .controller('volunteerViewController', volunteerViewController);

})();
