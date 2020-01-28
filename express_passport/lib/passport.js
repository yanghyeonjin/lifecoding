module.exports = function(app) {
    // 실제로 이렇게 하면 안 됨
    var authData = {
        email: 'egoing777@gmail.com',
        password: '111111',
        nickname: 'egoing'
    };

    var passport = require('passport'), // session 모듈을 사용하기 때문에 use session 아래에 넣어야 한다.
        LocalStrategy = require('passport-local').Strategy,
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        // 로그인 성공했을 때 딱 한번 호출 되면서 session store에 식별자를 저장하는 역할 > sessions 폴더 안에 있는 파일들..
        // 로그인 성공했을 때 전달한 authData가 user로...
        // 사용자를 식별할 수 있는 인자를 전달... > 여기에서는 email
        done(null, user.email);
    });

    passport.deserializeUser(function(id, done) {
        // 페이지에 들어올 때마다 호출 됨.
        // 저장된 데이터를 기준으로 우리가 필요한 데이터를 조회할 때 사용하는 것.
        // 식별자로 넘겨준 user.email이 id가 되었다.
        done(null, authData); // authData > request.user로 데이터 주입.
    });

    // pm2, nodemon과 같은 자동 재시작 도구를 사용하는 경우 세션 정보가 저장이 안되는 현상이 발생할 수 있습니다.
    // 이유는 sessions 디렉토리에 파일이 추가되면 node가 재시작 되기 때문입니다.
    // 이를 해결하기 위해 sessions 디렉토리에 대해서는 재시작을 하지 않도록 조치해야 합니다.
    // nodemon main.js --ignore sessions/*
    passport.use(
        new LocalStrategy(
            {
                // name으로 넘어오는 단어들 바꾸고 싶을 때...
                // 기본은 username, password임
                usernameField: 'email',
                passwordField: 'pwd'
            },
            function(username, password, done) {
                if (username === authData.email) {
                    if (password === authData.password) {
                        return done(null, authData, { message: 'Welcome!' });
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                } else {
                    return done(null, false, { message: 'Incorrect username.' });
                }
            }
        )
    );

    var secret_key = require('../lib/secret_key');
    passport.use(
        new GoogleStrategy(
            {
                clientID: secret_key.GOOGLE_CLIENT_ID,
                clientSecret: secret_key.GOOGLE_CLIENT_SECRET,
                callbackURL: secret_key.GOOGLE_CALLBACK_URL
            },
            function(accessToken, refreshToken, profile, done) {
                console.log('GoogleStrategy', accessToken, refreshToken, profile);
                // User.findOrCreate({ googleId: profile.id }, function(err, user) {
                //     return done(err, user);
                // });
            }
        )
    );

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login' }), function(req, res) {
        // 사용자가 구글로그인 성공했으면
        res.redirect('/');
    });
    return passport;
};
