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
        var s = self.schedules[0].schedule;
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
      console.log("test test test");
      console.log(document.getElementById('firstName') == null);
      //could consider all of the variable names like coachEmail into a list or an array and then iterate through them
      //instead of hard coding everything.

      if(document.getElementById('coachEmail') == null) {
       this.coachEmail = null;
       } else {
       this.coachEmail = document.getElementById('coachEmail').value;
       }

       if(document.getElementById('coachName') == null) {
       this.coachName = null;
       } else {
       this.coachName = document.getElementById('coachName').value;
       }

       if(document.getElementById('division')== null) {
       this.division = null;
       } else {
       this.division = document.getElementById('division').value;
       }

       if(document.getElementById('email') == null) {
       this.email = null;
       } else {
       this.email = document.getElementById('email').value;
       }

       if(document.getElementById('firstName') == null) {
       alert("Please fill in the required information.")
       } else {
       this.firstName = document.getElementById('firstName').value;
       }

       if(document.getElementById('lastName') == null) {
       alert("Please fill in the required information.")
       } else {
       this.lastName = document.getElementById('lastName').value;
       }

       if(document.getElementById('trainingAt') == null) {
       this.trainingAt = null;
       } else {
       this.trainingAt = document.getElementById('trainingAt').value;
       }

       if(document.getElementById('jobPreference1') == null) {
       this.jobPreference1 = null;
       } else {
       this.jobPreference1 = document.getElementById('jobPreference1').value;
       }

       if(document.getElementById('jobPreference2') == null) {
       this.jobPreference2 = null;
       } else {
       this.jobPreference2 = document.getElementById('jobPreference2').value;
       }

       if(document.getElementById('lunchPreference') == null) {
       this.lunchPreference = null;
       } else {
       this.lunchPreference = document.getElementById('lunchPreference').value;
       }

       if(document.getElementById('membershipName') == null) {
       this.membershipName = null;
       } else {
       this.membershipName = document.getElementById('membershipName').value;
       }

       if(document.getElementById('membershipRegion') == null) {
       this.membershipRegion = null;
       } else {
       this.membershipRegion = document.getElementById('membershipRegion').value;
       }

       if(document.getElementById('membershipNumber') == null) {
       this.membershipNumber = null;
       } else {
       this.membershipNumber = document.getElementById('membershipNumber').value;
       }

       if(document.getElementById('problem') == null) {
       this.problem = null;
       } else {
       this.problem = document.getElementById('problem').value;
       }

       if(document.getElementById('region') == null) {
       this.region = null;
       } else {
       this.region = document.getElementById('region').value;
       }

       if(document.getElementById('tShirt') == null) {
       this.tShirt = null;
       } else {
       this.tShirt = document.getElementById('tShirt').value;
       }

       if(document.getElementById('assoc') == null) {
       this.assoc = null;
       } else {
       this.assoc = document.getElementById('assoc').value;
       }

       if(document.getElementById('assocExp') == null) {
       this.assocExp = null;
       } else {
       this.assocExp = document.getElementById('assocExp').value;
       }

       if(document.getElementById('childTeam') == null) {
       this.childTeam = null;
       } else {
       this.childTeam = document.getElementById('childTeam').value;
       }

       if(document.getElementById('city') == null) {
       this.city = null;
       } else {
       this.city = document.getElementById('city').value;
       }

       if(document.getElementById('coachExp') == null) {
       this.coachExp = null;
       } else {
       this.coachExp = document.getElementById('coachExp').value;
       }

       if(document.getElementById('comment') == null) {
       this.comment = null;
       } else {
       this.comment = document.getElementById('comment').value;
       }

       if(document.getElementById('country') == null) {
       this.country = null;
       } else {
       this.country = document.getElementById('country').value;
       }

       if(document.getElementById('current') == null) {
       this.current = null;
       } else {
       this.current = document.getElementById('current').value;
       }

       if(document.getElementById('fax') == null) {
       this.fax = null;
       } else {
       this.fax = document.getElementById('fax').value;
       }

       if(document.getElementById('jobComment') == null) {
       this.jobComment = null;
       } else {
       this.jobComment = document.getElementById('jobComment').value;
       }

       if(document.getElementById('memberExp') == null) {
       this.memberExp = null;
       } else {
       this.memberExp = document.getElementById('memberExp').value;
       }

       if(document.getElementById('modifyOn') == null) {
       this.modifyOn = null;
       } else {
       this.modifyOn = document.getElementById('modifyOn').value;
       }

       if(document.getElementById('phone') == null) {
       this.phone = null;
       } else {
       this.phone = document.getElementById('phone').value;
       }

       if(document.getElementById('positionsHeld') == null) {
       this.positionsHeld = null;
       } else {
       this.positionsHeld = document.getElementById('positionsHeld').value;
       }

       if(document.getElementById('state') == null) {
       this.state = null;
       } else {
       this.state = document.getElementById('state').value;
       }

       if(document.getElementById('street1') == null) {
       this.street1 = null;
       } else {
       this.street1 = document.getElementById('street1').value;
       }

       if(document.getElementById('street2') == null) {
       this.street2 = null;
       } else {
       this.street2 = document.getElementById('street2').value;
       }

       if(document.getElementById('submitDate') == null) {
       this.submitDate = null;
       } else {
       this.submitDate = document.getElementById('submitDate').value;
       }

       if(document.getElementById('username') == null) {
       this.username = null;
       } else {
       this.username = document.getElementById('username').value;
       }

       if(document.getElementById('workPhone') == null) {
       this.workPhone = null;
       } else {
       this.workPhone = document.getElementById('workPhone').value;
       }

       if(document.getElementById('zip') == null) {
       this.zip = null;
       } else {
       this.zip = document.getElementById('zip').value;
       }



      self.$http.put('/api/volunteers/' + volunteer._id, {
        coachEmail: this.coachEmail,
        coachName: this.coachName,
        division: this.division,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        traingingAt: this.trainingAt,
        jobPreference1: this.jobPreference1,
        jobPreference2: this.jobPreference2,
        lunchPreference: this.lunchPreference,
        membershipName: this.membershipName,
        membershipRegion: this.membershipRegion,
        membershipNumber: this.membershipNumber,
        problem: this.problem,
        region: this.region,
        tShirt: this.tShirt,
        assoc: this.assoc,
        assocExp: this.assocExp,
        childTeam: this.childTeam,
        city: this.city,
        coachExp: this.coachExp,
        comment: this.comment,
        country: this.country,
        current: this.current,
        fax: this.fax,
        jobComment: this.jobComment,
        memberExp: this.memberExp,
        modifyOn: this.modifyOn,
        phone: this.phone,
        positionsHeld: this.positionsHeld,
        state: this.state,
        street1: this.street1,
        street2: this.street2,
        submitDate: this.submitDate,
        username: this.username,
        workPhone: this.workPhone,
        zip: this.zip
      });

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


      console.log(this.coachName);
      self.editMode = false;
      self.selected = ''
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
