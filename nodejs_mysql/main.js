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
        // 내용 수정 페이지
        topic.update(request, response);
    } else if (pathname === "/update_process") {
        // 내용 수정 저장하기
        topic.update_process(request, response);
    } else if (pathname === "/delete_process") {
        // 내용 삭제
        topic.delete_process(request, response);
    } else {
        response.writeHead(404);
        response.end("Not found");
    }
});
app.listen(3000);
