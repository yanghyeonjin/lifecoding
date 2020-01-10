var express = require("express"); // express 모듈을 load, express 변수로 사용
var app = express(); // 변수 express는 함수
var port = 3000;
var fs = require("fs");

var qs = require("querystring");
var bodyParser = require("body-parser");
var compression = require("compression");
var topicRouter = require("./routes/topic");
var indexRouter = require("./routes/index");

// public 디렉토리 안에서 정적파일을 찾겠다.
// url로 localhost:3000/images/파일이름
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

// get 방식에 해당하는 모든 것에 적용
// post 방식으로 처리하는 것들은 파일 목록을 안불러도 되니까 제외
app.get("*", function(request, response, next) {
    fs.readdir("./data", function(error, filelist) {
        request.list = filelist;
        next();
    });
});

// 라우터 분리
app.use("/", indexRouter);
app.use("/topic", topicRouter); // /topic으로 시작하는 주소들에게 topicRouter라고 하는 이름의 미들웨어를 적용하겠다.

// 404 에러에 대한 커스텀 에러 핸들링
// 미들웨어는 순차적으로 실행, 404 에러는 페이지를 못 찾았을 때 나오는 에러
// 코드 맨 위부터 순차적으로 실행하다가 더 이상 못 찾을 때 보여주어야 하기 때문에 마지막 부분에...
app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that!");
});

// 커스텀 에러 핸들링
// 커스텀 에러 핸들링을 작성하게 될 때, next(err)이 호출 될 때 default 에러 핸들링은 모두 무시되고 아래 미들웨어가 실행된다.
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
