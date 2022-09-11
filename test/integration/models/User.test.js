// ./test/integration/models/User.test.js

var util = require('util');

describe('User (model)', function () {

    describe('#findBestStudents()', function () {
        it('should return 5 users', function (done) {
            User.find({ emailAddress: 'admin@example.com' })
                .then(function (bestStudents) {
                    if (bestStudents.length !== 1) {
                        return done(new Error(
                            'Should return exactly 1 user.  ' +
                            'But instead, got: ' + util.inspect(bestStudents, { depth: null }) + ''
                        ));
                    }

                    return done();

                })
                .catch(done);
        });
    });

});