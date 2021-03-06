'use strict';

(function() {

    class SchedulerController {

        constructor($http, $scope, socket) {
            self = this;
            self.$http = $http;

            self.volunteers = [];
            self.arr = []; // Placeholder name for the array containing volunteers after we transform them.
            self.bestSchedule = [];
            self.bestRating = Number.MAX_SAFE_INTEGER;
            self.jobs = [];
            self.volunteer = [];

            $http.get('/api/volunteers').then(response => {
                self.volunteers = response.data;
                console.log("Volunteers loaded.");
                socket.syncUpdates('volunteer', self.volunteers);
                $scope.$watch('volunteer', (self.arr = self.makeVolunteers()))
            });

            $http.get('/api/jobs').then(response => {
                this.jobs = response.data;
                //socket.syncUpdates('job', self.jobs);
                $scope.$watch('job', (self.jobs = self.jobsToShifts(response.data)))
            });

            //self.makeJobs();
        }

        //volunteerById: a way to get our volunteers by ID to display their information in the full view
        volunteerById(id) {
            for (var i = 0; i < self.volunteers.length; i++) {
                if (id == self.volunteers[i]._id){
                    return self.volunteers[i];
                }
            }
        }


        //jobsArray should be the list of jobs pulled from the DB as of this comment.
        jobsToShifts(jobsArray) {
            var shiftsArray = [];
            for (var j = 0; j < jobsArray.length; j++) { // j because we are iterating though jobs
                for (var s = 0; s < jobsArray[j].shifts.length; s++) {
                    for (var n = 0; n < jobsArray[j].shifts[s].numberofVolunteers; n++) {
                        shiftsArray.push({
                            _id: jobsArray[j]._id,
                            start: jobsArray[j].shifts[s].start,
                            end: jobsArray[j].shifts[s].end
                        });
                    }
                }
                console.log(j);
            }
            return shiftsArray;
        }

        // Creates a bunch of fake jobs, for demo and testing.
        makeJobs() {
            for (var i = 0; i < 250; i++) {
                var sHour = parseInt(Math.random() * 24) * 100;
                var sMin = parseInt(Math.random() * 60);
                var eHour = (parseInt(Math.random() * 4) + 1) * 100;
                var s = sHour + sMin;
                var e = s + eHour;
                self.jobs.push({'_id': i, 'start': s, 'end': e})
            }
            console.log("Jobs have been generated.");
        }

        makeVolunteers() {
            console.log("Processing volunteers...");
            var fakeV = []; // Array of fake volunteers
            for (var i = 0; i < self.volunteers.length; i++) {
                fakeV.push({_id: self.volunteers[i]._id, commitments: [], preferences: []});
            }
            //person structure {'_id': i,'commitments':[],'preferences':[]}}
            //commitment {'name': i, 'start':n1,'end':n2}
            //preference {'thing':j,'magnitude':m}

            return fakeV;
        }

        makeSchedules() {
            var rate = 0;
            for (var i = 0; i < 1000; i++) {
                self.clearVolunteerAssignments();
                self.generateSchedule();
                rate = self.rateSchedule();
                if (rate < self.bestRating) {
                    self.bestRating = rate;
                    self.bestSchedule = self.arr;
                    console.log(rate);
                }
                self.shuffleArray(self.jobs);
                self.shuffleArray(self.volunteers);
            }
            console.log("----------")
            console.log(self.bestRating);
            console.log(self.bestSchedule);
            console.log("Number of unassigned jobs: " + self.checkAllJobsAssigned());
            self.$http.post('/api/schedules/', {schedule: self.bestSchedule, rating: self.bestRating});
        }

        // TODO: Fix this. It shouldn't delete all the things, just most of them.
        // Doesn't matter until we store things initially.
        clearVolunteerAssignments() {
            for(var i = 0; i < self.arr.length; i++) {
                self.arr[i].commitments = [];
            }
        }

        // TODO: Abstract this
        generateSchedule() {
            var jobs = self.jobs.slice();

            while (jobs.length !== 0) {
                var currJob = jobs.pop();
                var canInsert = true;
                var w = 0;

                for (var v = 0; v < self.arr.length; v++) {
                    for (var c = 0; c < self.arr[v].commitments.length; c++) {
                        var currCommitment = self.arr[v].commitments[c];
                        if ((currJob.start > currCommitment.start && currJob.start < currCommitment.end) ||
                            (currJob.end   > currCommitment.start && currJob.end   < currCommitment.end)) {
                                canInsert = false;
                        }
                    }
                    if (canInsert) {
                        self.arr[v].commitments.push(currJob);
                        break;
                    }
                }

                self.arr = self.shuffleArray(self.arr);
            }
        }

        checkAllJobsAssigned() {
            var sum = 0;
            for (var i = 0; i < self.arr.length; i++) {
                sum += self.arr[i].commitments.length;
            }
            return self.jobs.length - sum;
        }

        shuffleArray(arr) {
            var temp;
            var rand;
            for (var i = 0; i < arr.length; i++) {
                rand = Math.floor(Math.random() * arr.length);
                temp = arr[i];
                arr[i] = arr[rand];
                arr[rand] = temp;
            }
            return arr;
        }

        //person structure {'_id': i,'commitments':[],'preferences':[]}}
        //commitment {'name': i, 'start':n1,'end':n2}
        //preference {'thing':j,'magnitude':m}

        rateSchedule() { // schedule is an array, probably maybe.
            var schedule = self.arr;
            var score = 0;

            for(var i = 0; i < schedule.length; i++){
                score = score + self.personMetric(schedule[i]);
            }
            score = score + (5 * self.checkAllJobsAssigned());
            return score;
        }

        personMetric(person){
            return person.commitments.length * person.commitments.length;
        }
    }

    angular.module('ulyssesCreatorsApp')
    .controller('SchedulerController', SchedulerController)
})();
