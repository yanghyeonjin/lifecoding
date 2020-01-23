var db = require('../lib/lowdb');
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    var passport = require('passport'), // session 모듈을 사용하기 때문에 use session 아래에 넣어야 한다.
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        // 로그인 성공했을 때 딱 한번 호출 되면서 session store에 식별자를 저장하는 역할 > sessions 폴더 안에 있는 파일들..
        // 로그인 성공했을 때 전달한 authData가 user로...
        // 사용자를 식별할 수 있는 인자를 전달...
        console.log('serializeUser', user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // 페이지에 들어올 때마다 호출 됨.
        // 저장된 데이터를 기준으로 우리가 필요한 데이터를 조회할 때 사용하는 것.
        // 식별자로 넘겨준 user.email이 id가 되었다.
        var user = db
            .get('users')
            .find({
                id: id
            })
            .value();
        console.log('deserializeUser', id, user);
        done(null, user); // authData > request.user로 데이터 주입.
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
            function(email, password, done) {
                console.log('LocalStrategy', email);
                var user = db
                    .get('users')
                    .find({
                        email: email
                    })
                    .value();
                if (user) {
                    // 이메일이 있으면
                    bcrypt.compare(password, user.password, function(err, res) {
                        if (res) {
                            // 비밀번호도 맞으면
                            return done(null, user, { message: 'Welcome!' });
                        } else {
                            // 이메일은 맞는데 비밀번호 틀림
                            return done(null, false, { message: 'Password is not correct.' });
                        }
                    });
                } else {
                    // 이메일도 없음
                    return done(null, false, { message: 'There is no email.' });
                }
            }
        )
    );
    return passport;
};
