var http = require("http");
var fs = require("fs"); // 파일시스템 모듈을 변수 fs를 통해서 사용할 것이다
var url = require("url"); // url 모듈을 변수 url을 통해서 사용할 것이다
var qs = require("querystring"); // 쿼리스트링 모듈 사용
var path = require("path");

var template = require("./lib/template.js");

// 리팩토링 ~!~! 중요 ~~!!!

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    // console.log(pathName);

    //console.log(_url);
    //console.log(title); // 브라우저에서 URL 주소 뒷 부분에 직접 쿼리 스트링 넣어주어야 확인 가능

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
                const list = template.list(filelist);
                const html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="./create">create</a>`);

                response.writeHead(200);
                response.end(html);
            });
        } else {
            // queryData.id가 정의되었을 때, 있을 때

            // 특정 폴더에 있는 파일 목록 읽어오기
            fs.readdir("./nodejs/data", function(error, filelist) {
                // console.log(filelist);

                // 사용자가 직접 경로를 탐색하여 url을 바꾸었을 때를 대비하여 기본 주소?를 항상 유지하도록...
                var filteredID = path.parse(queryData.id).base;

                // 쿼리 스트링에 따라 해당되는 본문 내용 읽기
                fs.readFile(`nodejs/data/${filteredID}`, "utf8", function(err, description) {
                    var title = queryData.id;
                    const list = template.list(filelist);
                    const html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="./create">create</a> <a href="./update?id=${title}">update</a> <form action="./delete_process" method="post"><input type="hidden" name="id" value="${title}"/><input type="submit" value="delete"/></form>`);

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathName === "/create") {
        fs.readdir("./nodejs/data", function(error, filelist) {
            // console.log(filelist);

            var title = "WEB - create";
            const list = template.list(filelist);
            const html = template.HTML(
                title,
                list,
                `
            <form action="/create_process" method="post">
                <p>
                    <input type="text" name="title" placeholder="title" />
                </p>
                <p>
                    <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit" />
                </p>
            </form>
            `,
                ""
            );

            response.writeHead(200);
            response.end(html);
        });
    } else if (pathName === "/create_process") {
        var body = "";

        // post로 전송된 데이터가 많을 경우를 대비해....
        // 서버 쪽에서 data 조각을 수신할 때 마다 콜백함수 실행
        request.on("data", function(data) {
            body = body + data;

            // 용량이 너무 크게 들어오면 서버를 꺼버리는 보안장치
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });

        // 데이터가 조각조각 서버로 들어오다가 모든 데이터 수신이 끝났을 때 콜백함수 실행
        request.on("end", function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;

            fs.writeFile(`./nodejs/data/${title}`, description, "utf8", function(err) {
                // 파일 쓰기 끝났을 때 실행
                // 페이지를 다른 곳으로 리다이렉션
                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            });
        });
    } else if (pathName === "/update") {
        fs.readdir("./nodejs/data", function(error, filelist) {
            var filteredID = path.parse(queryData.id).base;
            fs.readFile(`nodejs/data/${filteredID}`, "utf8", function(err, description) {
                var title = queryData.id;
                const list = template.list(filelist);
                const html = template.HTML(
                    title,
                    list,
                    `
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}"/>
                <p>
                    <input type="text" name="title" placeholder="title" value="${title}" />
                </p>
                <p>
                    <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit" />
                </p>
                </form>
                `,
                    `<a href="./create">create</a> <a href="./update?id=${title}">update</a>`
                );

                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathName === "/update_process") {
        var body = "";

        request.on("data", function(data) {
            body = body + data;
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });

        request.on("end", function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var id = post.id;

            console.log(post);

            fs.rename(`./nodejs/data/${id}`, `./nodejs/data/${title}`, function(err) {
                // 파일 제목 rename이 끝난 후 실행...

                // 파일 제목 바꾼 후 내용 수정
                fs.writeFile(`./nodejs/data/${title}`, description, "utf8", function(err) {
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });
        });
    } else if (pathName === "/delete_process") {
        var body = "";

        request.on("data", function(data) {
            body = body + data;
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });

        request.on("end", function() {
            var post = qs.parse(body);
            var id = post.id;
            var filteredID = path.parse(id).base;

            fs.unlink(`./nodejs/data/${filteredID}`, function(err) {
                // 삭제 완료 후

                response.writeHead(302, { Location: "/" });
                response.end();
            });
        });
    } else {
        // 루트가 아닌 곳으로 접속했다면 error
        response.writeHead(404);
        response.end("Not Found");
    }

    // console.log(__dirname + _url);
    // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000); // 포트번호
