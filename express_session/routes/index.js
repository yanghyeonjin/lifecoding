var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

function authIsOwner(request, response) {
    if (request.session.is_login) {
        // 로그인 되어 있으면
        return true;
    } else {
        return false;
    }
}

function authStatusUI(request, response) {
    var authStatusUI = '<a href="/auth/login">login</a>';
    if (authIsOwner(request, response)) {
        authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`;
    }

    return authStatusUI;
}

// app.get(path, callback)
// app.get('/', function(req, res) {return res.send("Hello World!")})
// route, routing
// 갈림길에서 방향을 잡는 것. 사용자들이 여러 path로 들어올 때 그에 따른 응답을 해주는 것.
router.get('/', (request, response) => {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `<h2>${title}</h2>${description}<img src="/images/hello.jpg" style="width: 300px; display: block; margin-top: 10px;">`, `<a href="/topic/create">create</a>`, authStatusUI(request, response));
    response.send(html);
});

module.exports = router;
