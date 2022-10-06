const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user.id);
    });
});

passport.deserializeUser(function (id, cb) {
    db.get('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '101487574920-32hkcqeeo3kttl4lfde2fpm346kcmukg.apps.googleusercontent.com',
            clientSecret: 'Cg07iaEN_p6fC3L8775',
            callbackURL: 'http://localhost:3000/google/callback',
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        },
    ),
);
