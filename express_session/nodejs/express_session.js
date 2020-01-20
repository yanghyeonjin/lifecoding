var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');

var app = express();

app.use(
    session({
        secret: 'keyboard cat', // 다른 사람에게 공유되면 안되는 정보
        resave: false, // 그냥 false로...
        saveUninitialized: true // 그냥 ture로... true면 세션이 필요하기 전까지 세션을 구동시키지 않는다.
    })
);

app.get('/', function(req, res, next) {
    res.send('Hello session');
});

app.listen(3000, function() {
    console.log('3000 port!');
});
