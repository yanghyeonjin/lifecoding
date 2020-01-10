var db = require("./db"); // 디비 연결한 파일
var template = require("./template");
var qs = require("querystring");

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
                    td {
                        padding: 10px;
                        border: 1px solid black;
                    }
                </style>
                <form action="/author/create_process" method="post">
                    <p><input type="text" name="name" placeholder="name"></p>
                    <p><textarea name="profile" placeholder="profile"></textarea></p>
                    <p><input type="submit"></p>
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
