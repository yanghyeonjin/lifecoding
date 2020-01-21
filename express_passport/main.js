var express = require('express'); // express 모듈을 load, express 변수로 사용
var app = express(); // 변수 express는 함수
var port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session); // 파일보단 디비에 저장 권장 ...
var flash = require('connect-flash');

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

app.use(flash()); // session을 사용하기 때문에 session 아래에 배치
app.get('/flash', function(req, res) {
    req.flash('msg', 'Flash is back!!'); // session store에 key와 value로 저장된다.
    res.send('flash');
});

app.get('/flash-display', function(req, res) {
    // flash 데이터를 session store에서 삭제 시킨 다음에 변수에 담는다..
    var fmsg = req.flash();
    console.log(fmsg);
    res.send(fmsg);
});

var passport = require('passport'), // session 모듈을 사용하기 때문에 use session 아래에 넣어야 한다.
    LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // 로그인 성공했을 때 딱 한번 호출 되면서 session store에 식별자를 저장하는 역할 > sessions 폴더 안에 있는 파일들..
    // 로그인 성공했을 때 전달한 authData가 user로...
    // 사용자를 식별할 수 있는 인자를 전달... > 여기에서는 email
    console.log('Serialize', user);
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    // 페이지에 들어올 때마다 호출 됨.
    // 저장된 데이터를 기준으로 우리가 필요한 데이터를 조회할 때 사용하는 것.
    // 식별자로 넘겨준 user.email이 id가 되었다.
    console.log('Deserialize', id);
    done(null, authData); // authData > request.user로 데이터 주입.
});

// 실제로 이렇게 하면 안 됨
var authData = {
    email: 'egoing777@gmail.com',
    password: '111111',
    nickname: 'egoing'
};

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
