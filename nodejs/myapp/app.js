// express generator 사용하기 (커밋 내용 말고 아래 주석을 참고 할 것)
// Node 서버가 없다면 서버 설치부터..

// 1. express-generator 모듈 설치
// npm install -g express-generator

// 2. (프로젝트 생성 할 곳으로 이동 후) 프로젝트 생성 및 템플릿 엔진 ejs 설정
// express 프로젝트폴더이름 --view=ejs

// 3. 생성된 프로젝트 폴더로 이동 후 필요한 module 설치
// cd 프로젝트폴더이름
// npm install (package.json 파일을 참고하여 자동으로 설치해준다.)

// 4. Node 서버 실행
// npm start

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade"); // 템플릿 엔진 설정 (views)

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
