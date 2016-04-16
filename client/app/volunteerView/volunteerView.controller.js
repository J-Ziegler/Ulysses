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
        socket.syncUpdates('volunteer', this.volunteers);
      });

      $http.get('/api/jobs').then(response => {
        this.jobs = response.data;
        socket.syncUpdates('job', this.jobs);
      });

      $http.get('/api/schedules').then(response => {
        this.schedules = response.data;
        socket.syncUpdates('schedule', this.schedules);
      });
    }

    deleteVolunteer(volunteer){
      if(confirm("Are you sure that you want to delete " + volunteer.firstName + "?")) {
        console.log("Deleting " + volunteer.firstName + " " + volunteer.lastName);
        self.removeFromDatabase(volunteer._id);
      } else {
        console.log("The volunteer has not been deleted.");
      }
    }

    removeFromDatabase(id) {
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
        return [];
      //console.log(this.schedules[0].schedule);
      //console.log(this.schedules.rating);
      for (var i = 0; i < this.schedules[0].schedule.length; i++) {
        if (this.schedules[0].schedule[i]._id === id) {
          return this.schedules[0].schedule[i].commitments;
        }
      }
    }
  }

  angular.module('ulyssesCreatorsApp')
    .controller('volunteerViewController', volunteerViewController);

})();
