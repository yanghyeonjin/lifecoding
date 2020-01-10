var express = require("express"); // express 모듈을 load, express 변수로 사용
var app = express(); // 변수 express는 함수
var port = 3000;
var fs = require("fs");
var template = require("./lib/template.js");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var qs = require("querystring");
var bodyParser = require("body-parser");
var compression = require("compression");

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

// app.get(path, callback)
// app.get('/', function(req, res) {return res.send("Hello World!")})
// route, routing
// 갈림길에서 방향을 잡는 것. 사용자들이 여러 path로 들어올 때 그에 따른 응답을 해주는 것.
app.get("/", (request, response) => {
    var title = "Welcome";
    var description = "Hello, Node.js";
    var list = template.list(request.list);
    var html = template.HTML(title, list, `<h2>${title}</h2>${description}<img src="/images/hello.jpg" style="width: 300px; display: block; margin-top: 10px;">`, `<a href="/create">create</a>`);
    response.send(html);
});

app.get("/page/:pageID", (request, response, next) => {
    var filteredId = path.parse(request.params.pageID).base;
    fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
        if (err) {
            next(err);
        } else {
            var title = request.params.pageID;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags: ["h1"]
            });
            var list = template.list(request.list);
            var html = template.HTML(
                sanitizedTitle,
                list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                ` <a href="/create">create</a>
              <a href="/update/${sanitizedTitle}">update</a>
              <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
            );
            response.send(html);
        }
    });
});

app.get("/create", (request, response) => {
    var title = "WEB - create";
    var list = template.list(request.list);
    var html = template.HTML(
        title,
        list,
        `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        ""
    );
    response.send(html);
});

app.post("/create_process", (request, response) => {
    var post = request.body; // body-parser 미들웨어 사용
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, "utf8", function(err) {
        response.redirect(`/page/${title}`);
    });
});

app.get("/update/:pageID", (request, response) => {
    var filteredId = path.parse(request.params.pageID).base;
    fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
        var title = request.params.pageID;
        var list = template.list(request.list);
        var html = template.HTML(
            title,
            list,
            `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                  </p>
                  <p>
                    <input type="submit">
                  </p>
                </form>
                `,
            `<a href="/create">create</a> <a href="/update/${title}">update</a>`
        );
        response.send(html);
    });
});

app.post("/update_process", (request, response) => {
    var post = request.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error) {
        fs.writeFile(`data/${title}`, description, "utf8", function(err) {
            response.redirect(`/page/${title}`);
        });
    });
});

app.post("/delete_process", (request, response) => {
    var post = request.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error) {
        response.redirect(`/`);
    });
});

// 404 에러에 대한 커스텀 에러 핸들링
// 미들웨어는 순차적으로 실행, 404 에러는 페이지를 못 찾았을 때 나오는 에러
// 코드 맨 위부터 순차적으로 실행하다가 더 이상 못 찾을 때 보여주어야 하기 때문에 마지막에...
// 코드 중에 next(err)가 있을 땐 실행 안 됨.
app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that!");
});

// 모든 에러에 대한 커스텀 에러 핸들링
// 커스텀 에러 핸들링을 작성하게 될 때, next(err)이 호출 될 때 default 에러 핸들링은 모두 무시되고 아래 미들웨어가 실행된다.
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
