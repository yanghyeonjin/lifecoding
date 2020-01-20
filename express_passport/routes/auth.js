var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template');

router.get('/login', (request, response) => {
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(
        title,
        list,
        `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
      `,
        ''
    );
    response.send(html);
});

router.get('/logout', (request, response) => {
    request.logout(); // passport로 로그아웃하고
    request.session.save(function() {
        // 현재의 세션상태를 세션 store에 저장하고 나서...
        request.session.destroy(function(error) {
            // 세션 삭제가 끝난 후...
            response.redirect('/');
        });
    });
});

module.exports = router;
