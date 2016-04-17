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

      //below are our editing things
      this.firstName = "";
      this.lastName = "";
      this.assoc = "";
      this.email = "";
      this.phone = "";
      this.workPhone = "";
      this.fax = "";
      this.street1 = "";
      this.street2 = "";
      this.city = "";
      this.state = "";
      this.zip = "";
      this.country = "";
      this.region = "";
      this.division = "";
      this.coachName = "";
      this.coachEmail = "";
      this.jobPreference1 = "";
      this.jobPreference2 = "";
      this.trainingAt = "";
      this.lunchPreference = "";
      this.membershipName = "";
      this.membershipRegion = "";
      this.membershipNumber = "";
      this.problem = "";
      this.tShirt = "";
      this.assocExp = "";
      this.childTeam = "";
      this.coachExp = "";
      this.comment = "";
      this.current = "";
      this.jobComment = "";
      this.memberExp = "";
      this.modifyOn = "";
      this.positionsHeld = "";
      this.submitDate = "";
      this.username = "";




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

    //this function just makes the editing stuff appear or disappear
    editVolunteer(id){
      self.selected = id;
      self.editMode = true;
    }

    saveEdits(volunteer){
      this.editVolunteer(volunteer)
      //this is where we'll put all the actual editing stuff.
    }

    expandDetails(item){
      if (this.selected === "") {
        this.selected = item['_id']
      } else {
        this.selected = "";
      }
      item.show = !item.show;
    };


    getVolunteerSchedule(id) {
      var sched = this.schedules[0].schedule;

      for (var i = 0; i < sched.length; i++) {
        if (sched[i]._id === id) {
          return sched[i].commitments;
        }
      }
    }

    getJobById(id) {
        for (var i = 0; i < self.jobs.length; i++) {
            if (self.jobs[i]._id == id) {
                return self.jobs[i];
            }
        }
    }

    militaryToHuman(mTime) {
        var h = parseInt(mTime / 100) % 12;
        var m = parseInt(mTime % 100);
        var am = "AM";

        if (h === 0) {
            h = 12
        }

        if (mTime > 1200) {
            am = "PM"
        }

        if (m < 10) {
            m = "0" + m;
        }

        return h + ":" + m + am;
    }

  }

  angular.module('ulyssesCreatorsApp')
    .controller('volunteerViewController', volunteerViewController);

})();
