var sails = require('sails');

// Before running any tests...
before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(80000);
    let app;
    try {
        var rc = require('sails/accessible/rc');
        // sails.lift({
        //   // Your Sails app's configuration files will be loaded automatically,
        //   // but you can also specify any other special overrides here for testing purposes.

        //   // For example, we might want to skip the Grunt hook,
        //   // and disable all logs except errors and warnings:
        //   hooks: { grunt: false },
        //   log: { level: 'warn' },
        //   models: {
        //     // connection: 'unitTestConnection',
        //     migrate: 'drop'
        //   },
        //   datastores: {
        //     default: {
        //       adapter: 'sails-disk'
        //     }
        //   }

        // }, async (err, sails) => {
        sails.lift({
            ...rc('sails'), ...{
                models: {
                    // connection: 'unitTestConnection',
                    migrate: 'drop'
                },
                log: { level: 'info' },
            }
        }, async (err, sails) => {
            if (err) { return done(err); }

            app = sails;

            // here you can load fixtures, etc.
            // (for example, you might want to create some records in the database)
            console.log('Creating test users');
            await User.createEach([
                { emailAddress: 'RyanDahl@example.com', fullName: 'Ryan2 Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
                // { emailAddress: 'user2@example.com', fullName: 'User 2', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1234') },
                // { emailAddress: 'user3@example.com', fullName: 'User 3', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1235') },
            ]);
            console.log('RyanDahl@example.com User created');
            await User.createEach([
                // { emailAddress: 'RyanDahl@example.com', fullName: 'Ryan2 Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
                { emailAddress: 'user2@example.com', fullName: 'User XY', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc123') },
                // { emailAddress: 'user3@example.com', fullName: 'User 3', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1235') },
            ]);
            console.log('user2@example.com User created');
            await User.createEach([
                // { emailAddress: 'RyanDahl@example.com', fullName: 'Ryan2 Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
                // { emailAddress: 'user2@example.com', fullName: 'User 2', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1234') },
                { emailAddress: 'user3e@example.com', fullName: 'User XYZZZ', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1235') },
            ]);
            console.log('user3@example.com User created');
            // console.log(User);
            console.log('Created test users');

            console.log('Sails lifted!');
            return done();
        });
    } catch (err) {
        return done(err);
    }
    // return done();
});

// After all tests have finished...
after((done) => {

    // here you can clear fixtures, etc.
    // (e.g. you might want to destroy the records you created above)

    if (sails) {
        sails.lower(done);
    }
    console.log('Sails lowered!');

});

// Before running any tests...
// before(async function (done) {

//     // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
//     this.timeout(50000);

//     sails.lift({
//         // Your Sails app's configuration files will be loaded automatically,
//         // but you can also specify any other special overrides here for testing purposes.

//         // For example, we might want to skip the Grunt hook,
//         // and disable all logs except errors and warnings:
//         hooks: { grunt: false },
//         log: { level: 'warn' },

//     }, async (err) => {
//         if (err) { return done(err); }

//         // here you can load fixtures, etc.
//         // (for example, you might want to create some records in the database)

//         await User.createEach([
//             { emailAddress: 'admin@example.com', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
//             { emailAddress: 'user2@example.com', fullName: 'User 2', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1234') },
//             { emailAddress: 'user3@example.com', fullName: 'User 3', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('abc1235') },
//         ]);

//         return done();
//     });
// });

// // After all tests have finished...
// after((done) => {

//     // here you can clear fixtures, etc.
//     // (e.g. you might want to destroy the records you created above)

//     sails.lower(done);

// });