var db = require("./db"); // 디비 연결한 파일
var template = require("./template");
var url = require("url");
var qs = require("querystring");
var sanitizeHtml = require("sanitize-html");

exports.home = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = template.list(topics);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);

        response.writeHead(200);
        response.end(html);
    });
};

exports.page = function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error, topics) {
        if (error) {
            throw error; // 에러가 있을 경우, 다음 코드를 진행하지 않고 에러를 console에 출력하고 앱을 즉시 종료.
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`, [queryData.id], function(error2, topic) {
            if (error2) {
                throw error2;
            }
            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);

            // sanitize-html 모듈을 사용하면 자바스크립트 공격이 들어왔을 때 해당 부분을 삭제해준다.
            // title: test, description: <script>alert('1')</script>, author: hyeonjin
            // 위 상태로 저장하면 db에는 자바스크립트문이 저장되어있지만 페이지에 출력 되지 않는다.
            // 나머지 출력해야하는 부분도 확인해서 바꿔주어야 한다.
            // 사용자가 입력한 정보는 모~~~~두 살균 해야한다.
            // 입력 할 때 방지할 수 있는 방법도 생각해보자 > 살균된 데이터만 디비에 저장
            var html = template.HTML(
                title,
                list,
                `<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)}
                <p>by ${sanitizeHtml(topic[0].name)}</p>`,
                ` <a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <input type="submit" value="delete">
            </form>`
            );

            response.writeHead(200);
            response.end(html);
        });

        // 누군가 url 마지막에 ';drop table topic;' 이라고 넣으면 공격당할 수 있다.
        // 그렇지만 아래 코드로 인해 공격한 sql문은 따옴표 안으로 들어가게 되어 문자로 인식된다.
        // SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = '1;drop table topic;' 이렇게 들어가게 된다.
        // 아래 처럼 물음표를 통해 데이터를 치환하는 방식을 사용해야 한다.
        // 방어 성공
        var query = db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`, [queryData.id], function(error2, topic) {
            if (error2) {
                throw error2;
            }
            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `<h2>${title}</h2>${description}
                <p>by ${topic[0].name}</p>`,
                ` <a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <input type="submit" value="delete">
            </form>`
            );

            response.writeHead(200);
            response.end(html);
        });
        console.log(query.sql);
    });
};

exports.create = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
            console.log(authors);
            var title = "Create";
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                ${template.authorSelect(authors)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
                `<a href="/create">create</a>`
            );

            response.writeHead(200);
            response.end(html);
        });
    });
};

exports.create_process = function(request, response) {
    var body = "";
    request.on("data", function(data) {
        body = body + data;
    });
    request.on("end", function() {
        var post = qs.parse(body);
        db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?);`, [post.title, post.description, post.author], function(error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, { Location: `/?id=${result.insertId}` });
            response.end();
        });
    });
};

exports.update = function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

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
};

exports.update_process = function(request, response) {
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
};

exports.delete_process = function(request, response) {
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
};
