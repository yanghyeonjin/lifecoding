var express = require('express'); // express 모듈을 load, express 변수로 사용
var app = express(); // 변수 express는 함수
var port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session); // 파일보단 디비에 저장 권장 ...

var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

app.use(helmet()); // 기본적으로 사용한다고 생각

// public 디렉토리 안에서 정적파일을 찾겠다.
// url로 localhost:3000/images/파일이름
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(
    session({
        secret: 'keyboard cat', // 다른 사람에게 공유되면 안되는 정보
        resave: false, // 그냥 false로...
        saveUninitialized: true, // 그냥 ture로... true면 세션이 필요하기 전까지 세션을 구동시키지 않는다.
        store: new FileStore()
    })
);

var passport = require('passport'), // session 모듈을 사용하기 때문에 use session 아래에 넣어야 한다.
    LocalStrategy = require('passport-local').Strategy;

// 실제로 이렇게 하면 안 됨
var authData = {
    email: 'egoing777@gmail.com',
    password: '111111',
    nickname: 'egoing'
};

passport.use(
    new LocalStrategy(
        {
            // name으로 넘어오는 단어들 바꾸고 싶을 때...
            // 기본은 username, password임
            usernameField: 'email',
            passwordField: 'pwd'
        },
        function(username, password, done) {
            console.log('LocalStrategy', username, password);
            if (username === authData.email) {
                console.log(1);
                if (password === authData.password) {
                    console.log(2);
                    return done(null, authData);
                } else {
                    console.log(3);
                    return done(null, false, { message: 'Incorrect password.' });
                }
            } else {
                console.log(4);
                return done(null, false, { message: 'Incorrect username.' });
            }
        }
    )
);

// /auth/login_process로 들어왔을 때 실행
// 'local' 전략은 username이랑 password로 인증할 때..
// 구글이나 페이스북 로그인은 다른 것 써야 함
// 로그인 성공 > /
// 로그인 실패 > /auth/login
app.post('/auth/login_process', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login' }));

// get 방식에 해당하는 모든 것에 적용
// post 방식으로 처리하는 것들은 파일 목록을 안불러도 되니까 제외
app.get('*', function(request, response, next) {
    fs.readdir('./data', function(error, filelist) {
        request.list = filelist;
        next();
    });
});

// 라우터 분리
app.use('/', indexRouter);
app.use('/topic', topicRouter); // /topic으로 시작하는 주소들에게 topicRouter라고 하는 이름의 미들웨어를 적용하겠다.
app.use('/auth', authRouter);

// 404 에러에 대한 커스텀 에러 핸들링
// 미들웨어는 순차적으로 실행, 404 에러는 페이지를 못 찾았을 때 나오는 에러
// 코드 맨 위부터 순차적으로 실행하다가 더 이상 못 찾을 때 보여주어야 하기 때문에 마지막 부분에...
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

// 커스텀 에러 핸들링
// 커스텀 에러 핸들링을 작성하게 될 때, next(err)이 호출 될 때 default 에러 핸들링은 모두 무시되고 아래 미들웨어가 실행된다.
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
