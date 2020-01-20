var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');

var app = express();

// 세션 미들웨어는 request 객체에 session property를 추가해주는구나..
app.use(
    session({
        secret: 'keyboard cat', // 다른 사람에게 공유되면 안되는 정보
        resave: false, // 그냥 false로...
        saveUninitialized: true // 그냥 ture로... true면 세션이 필요하기 전까지 세션을 구동시키지 않는다.
    })
);

app.get('/', function(req, res, next) {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views: ${req.session.num}`);
    // 현재 req.session.num은 메모리에 저장된다.
    // 따라서 서버를 끄면 다 날라감.
});

app.listen(3000, function() {
    console.log('3000 port!');
});
