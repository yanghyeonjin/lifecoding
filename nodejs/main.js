var http = require("http");
var fs = require("fs"); // 파일시스템 모듈을 변수 fs를 통해서 사용할 것이다
var url = require("url"); // url 이라는 모듈을 변수 url을 통해서 사용할 것이다

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;

    //console.log(_url);
    //console.log(title); // URL 주소 뒷 부분에 직접 쿼리 스트링 넣어주어야 확인 가능

    // console.log(url.parse(_url, true));

    if (pathName === "/") {
        // 쿼리 스트링에 따라 해당되는 본문 내용 읽기
        fs.readFile(`nodejs/data/${title}`, "utf8", function(err, description) {
            const template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <div>${description}</div>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
        });
    } else {
        // 루트가 아닌 곳으로 접속했다면 error
        response.writeHead(404);
        response.end("Not Found");
    }

    // console.log(__dirname + _url);
    // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
