var http = require("http");
var fs = require("fs"); // 파일시스템 모듈을 변수 fs를 통해서 사용할 것이다
var url = require("url"); // url 이라는 모듈을 변수 url을 통해서 사용할 것이다

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    //console.log(_url);
    //console.log(title); // URL 주소 뒷 부분에 직접 쿼리 스트링 넣어주어야 확인 가능

    // console.log(url.parse(_url, true));

    if (pathName === "/") {
        // 루트일 때

        if (queryData.id === undefined) {
            // queryData.id가 정의되지 않았을 때, 없을 때

            // 특정 폴더에 있는 파일 목록 읽어오기
            fs.readdir("./nodejs/data", function(error, filelist) {
                // console.log(filelist);

                var title = "Welcome";
                var description = "Hello, Node.js";

                var list = "<ul>";
                var i = 0;
                while (i < filelist.length) {
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + "</ul>";
                // console.log(list);

                const template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <div>${description}</div>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            // queryData.id가 정의되었을 때, 있을 때

            // 특정 폴더에 있는 파일 목록 읽어오기
            fs.readdir("./nodejs/data", function(error, filelist) {
                // console.log(filelist);

                var list = "<ul>";
                var i = 0;
                while (i < filelist.length) {
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i = i + 1;
                }
                list = list + "</ul>";

                // 쿼리 스트링에 따라 해당되는 본문 내용 읽기
                fs.readFile(`nodejs/data/${queryData.id}`, "utf8", function(err, description) {
                    var title = queryData.id;
                    const template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <div>${description}</div>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        // 루트가 아닌 곳으로 접속했다면 error
        response.writeHead(404);
        response.end("Not Found");
    }

    // console.log(__dirname + _url);
    // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
