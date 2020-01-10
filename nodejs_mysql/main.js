var http = require("http");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var db = require("./lib/db"); // 디비 연결한 파일
var topic = require("./lib/topic");

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === "/") {
        if (queryData.id === undefined) {
            // 홈
            topic.home(request, response);
        } else {
            // 상세보기
            topic.page(request, response);
        }
    } else if (pathname === "/create") {
        // 내용 추가 페이지
        topic.create(request, response);
    } else if (pathname === "/create_process") {
        // 내용 추가한 것 저장
        topic.create_process(request, response);
    } else if (pathname === "/update") {
        db.query(`SELECT * FROM topic`, function(error, topics) {
            if (error) {
                throw error;
            }
            db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function(error2, topic) {
                if (error2) {
                    throw error2;
                }
                db.query(`SELECT * FROM author`, function(error3, authors) {
                    if (error3) {
                        throw error3;
                    }
                    var list = template.list(topics);
                    var html = template.HTML(
                        topic[0].title,
                        list,
                        `<form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${topic[0].id}">
                    <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                    <p>
                      <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                    </p>
                    <p>
                        ${template.authorSelect(authors, topic[0].author_id)}
                    </p>
                    <p>
                      <input type="submit">
                    </p>
                  </form>`,
                        `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                    );

                    response.writeHead(200);
                    response.end(html);
                });
            });
        });
    } else if (pathname === "/update_process") {
        var body = "";
        request.on("data", function(data) {
            body = body + data;
        });
        request.on("end", function() {
            var post = qs.parse(body);

            db.query(`UPDATE topic SET title = ?, description = ?, author_id = ? WHERE id = ?`, [post.title, post.description, post.author, post.id], function(error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/?id=${post.id}` });
                response.end();
            });
        });
    } else if (pathname === "/delete_process") {
        var body = "";
        request.on("data", function(data) {
            body = body + data;
        });
        request.on("end", function() {
            var post = qs.parse(body);

            db.query(`DELETE from topic WHERE id = ?`, [post.id], function(error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/` });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end("Not found");
    }
});
app.listen(3000);
