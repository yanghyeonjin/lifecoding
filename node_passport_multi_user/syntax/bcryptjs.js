var bcrypt = require('bcryptjs');

// To hash a password
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash('111111', salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);

        // To check a password
        // Load hash from your password DB.
        bcrypt.compare('111111', hash, function(err, res) {
            // res === true
            console.log('my password', res);
        });

        bcrypt.compare('222222', hash, function(err, res) {
            // res === false
            console.log('other password', res);
        });
    });
});
