module.exports = function(Shift) {
    Shift.status = function(cmysqlDs) {
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var OPEN_HOUR = 14;
      var CLOSE_HOUR = 16;
      console.log('Current hour is %d', currentHour);
      var response;
      if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
        response = 'Lektiecafeen er åben.';
      } else {
        response = 'Lektiecafeen er desværre lukket.';
      }
      cb(null, response);
    };
    Shift.remoteMethod(
      'status', {
        http: {
          path: '/status',
          verb: 'get'
        },
        returns: {
          arg: 'status',
          type: 'string'
        }
      }
    );
  };