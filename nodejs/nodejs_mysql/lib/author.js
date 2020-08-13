var db = require("./db"); // 디비 연결한 파일
var template = require("./template");
var qs = require("querystring");
var url = require("url");

exports.home = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error, authors) {
            var title = "Author";
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `
                ${template.authorTable(authors)}
                <style>
                    table {
                        border-collapse: collapse;
                    }
                    thead {
                        font-weight: bold;
                    }
                    td {
                        padding: 10px;
                        border: 1px solid black;
                    }
                </style>
                <form action="/author/create_process" method="post">
                    <p><input type="text" name="name" placeholder="name"></p>
                    <p><textarea name="profile" placeholder="profile"></textarea></p>
                    <p><input type="submit" value="create"></p>
                </form>
                `,
                `
                `
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
        db.query(`INSERT INTO author (name, profile) VALUES(?, ?);`, [post.name, post.profile], function(error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, { Location: `/author` });
            response.end();
        });
    });
};

exports.update = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
            var _url = request.url;
            var queryData = url.parse(_url, true).query;

            db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function(error3, author) {
                var title = "Author";
                var list = template.list(topics);
                var html = template.HTML(
                    title,
                    list,
                    `
                    ${template.authorTable(authors)}
                    <style>
                        table {
                            border-collapse: collapse;
                        }
                        thead {
                            font-weight: bold;
                        }
                        td {
                            padding: 10px;
                            border: 1px solid black;
                        }
                    </style>
                    <form action="/author/update_process" method="post">
                        <input type="hidden" name="id" value="${queryData.id}">
                        <p><input type="text" name="name" placeholder="name" value="${author[0].name}"></p>
                        <p><textarea name="profile" placeholder="profile">${author[0].profile}</textarea></p>
                        <p><input type="submit" value="update"></p>
                    </form>
                    `,
                    `
                    `
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

        db.query(`UPDATE author SET name = ?, profile = ? WHERE id = ?`, [post.name, post.profile, post.id], function(error, result) {
            if (error) {
                throw error;
            }
            response.writeHead(302, { Location: `/author` });
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

        // 저자가 남긴 topic 부터 지운다
        db.query(`DELETE from topic WHERE author_id = ?`, [post.id], function(error, result) {
            if (error) {
                throw error;
            }
            // 그 다음에 저자를 지운다
            db.query(`DELETE from author WHERE id = ?`, [post.id], function(error2, result2) {
                if (error2) {
                    throw error2;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            });
        });
    });
};
