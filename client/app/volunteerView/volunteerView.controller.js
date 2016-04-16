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
                Array.splice(i, 1);

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
    editVolunteer(volunteer){
      this.editMode = !this.editMode
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
