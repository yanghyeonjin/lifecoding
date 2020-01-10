var http = require("http");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var db = require("./lib/db"); // 디비 연결한 파일
var topic = require("./lib/topic");
var author = require("./lib/author");

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
    }

    // topic CRUD
    else if (pathname === "/create") {
        topic.create(request, response);
    } else if (pathname === "/create_process") {
        topic.create_process(request, response);
    } else if (pathname === "/update") {
        topic.update(request, response);
    } else if (pathname === "/update_process") {
        topic.update_process(request, response);
    } else if (pathname === "/delete_process") {
        topic.delete_process(request, response);
    }

    // author CRUD
    else if (pathname === "/author") {
        author.home(request, response);
    } else if (pathname === "/author/create_process") {
        author.create_process(request, response);
    } else {
        response.writeHead(404);
        response.end("Not found");
    }
});
app.listen(3000);
