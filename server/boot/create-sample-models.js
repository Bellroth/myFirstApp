var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    Shifts: async.apply(createShifts),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.Shifts, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }
  //create coffee shops
  function createShifts(cb) {
    mysqlDs.automigrate('Shift', function(err) {
      if (err) return cb(err);
      var Shift = app.models.Shift;
      Shift.create([{
        date: '13',
        requiredPeople: '4',
        day: "Wednesday"
      }, {
        date: '20',
        requiredPeople: '4',
        day: "Wednesday"
      }, {
        date: '20',
        requiredPeople: '4',
        day: "Wednesday"
      }, ], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, Shifts, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        ShiftId: Shiftss[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        ShiftId: Shiftss[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        ShiftId: Shiftss[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        ShiftId: Shiftss[2].id,
      }], cb);
    });
  }
};