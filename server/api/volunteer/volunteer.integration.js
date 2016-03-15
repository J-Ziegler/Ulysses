'use strict';

var app = require('../..');
import request from 'supertest';

var newVolunteer;

describe('Volunteer API:', function() {

  describe('GET /api/volunteers', function() {
    var volunteers;

    beforeEach(function(done) {
      request(app)
        .get('/api/volunteers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          volunteers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      volunteers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/volunteers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/volunteers')
        .send({
          firstName: 'New Volunteer',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVolunteer = res.body;
          done();
        });
    });

    it('should respond with the newly created volunteer', function() {
      newVolunteer.firstName.should.equal('New Volunteer');
    });

  });

  describe('GET /api/volunteers/:id', function() {
    var volunteer;

    beforeEach(function(done) {
      request(app)
        .get('/api/volunteers/' + newVolunteer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          volunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      volunteer = {};
    });

    it('should respond with the requested volunteer', function() {
      volunteer.firstName.should.equal('New Volunteer');
    });

  });

  describe('PUT /api/volunteers/:id', function() {
    var updatedVolunteer;

    beforeEach(function(done) {
      request(app)
        .put('/api/volunteers/' + newVolunteer._id)
        .send({
          firstName: 'Updated Volunteer',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVolunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVolunteer = {};
    });

    it('should respond with the updated volunteer', function() {
      updatedVolunteer.firstName.should.equal('Updated Volunteer');
    });

  });

  describe('DELETE /api/volunteers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/volunteers/' + newVolunteer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when volunteer does not exist', function(done) {
      request(app)
        .delete('/api/volunteers/' + newVolunteer._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
