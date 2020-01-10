var db = require("./db"); // 디비 연결한 파일
var template = require("./template");

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
        `,
                `<a href="/create">create</a>`
            );

            response.writeHead(200);
            response.end(html);
        });
    });
};
