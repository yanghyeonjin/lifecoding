module.exports = {
    HTML: function(title, list, body, control) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
    },
    list: function(topics) {
        var list = "<ul>";
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
            i = i + 1;
        }
        list = list + "</ul>";
        return list;
    },
    authorSelect: function(authors, author_id) {
        var tag = "";
        var i = 0;
        while (i < authors.length) {
            if (authors[i].id == author_id) {
                tag += `<option value="${authors[i].id}" selected>${authors[i].name}</option>`;
            } else {
                tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
            }
            i++;
        }
        return `<select name="author">${tag}</select>`;
    },
    authorTable: function(authors) {
        var authorList = `<table><tbody>`;
        var i = 0;

        while (i < authors.length) {
            authorList += `
                <tr>
                    <td>${authors[i].name}</td>
                    <td>${authors[0].profile}</td>
                    <td>update</td>
                    <td>delete</td>
                </tr>`;
            i++;
        }

        authorList += `</tbody></table>`;
        return authorList;
    }
};
