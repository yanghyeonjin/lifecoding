var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template');
var shortid = require('shortid');
var db = require('../lib/lowdb');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {
    router.get('/login', (request, response) => {
        var fmsg = request.flash();
        var feedback = '';
        if (fmsg.error) {
            feedback = fmsg.error[0];
        }
        var title = 'WEB - login';
        var list = template.list(request.list);
        var html = template.HTML(
            title,
            list,
            `
        <div style="color: red;">${feedback}</div>
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

    // /auth/login_process로 들어왔을 때 실행
    // 'local' 전략은 username이랑 password로 인증할 때..
    // 구글이나 페이스북 로그인은 다른 것 써야 함
    // 로그인 성공 > /
    // 로그인 실패 > /auth/login
    router.post('/login_process', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true, successFlash: true }));

    router.get('/register', (request, response) => {
        var fmsg = request.flash();
        var feedback = '';
        if (fmsg.error) {
            feedback = fmsg.error[0];
        }
        var title = 'WEB - login';
        var list = template.list(request.list);
        var html = template.HTML(
            title,
            list,
            `
        <div style="color: red;">${feedback}</div>
      <form action="/auth/register_process" method="post">
        <p><input type="text" name="email" placeholder="email" value="egoing777@gmail.com"></p>
        <p><input type="password" name="pwd" placeholder="password" value="111111"></p>
        <p><input type="password" name="pwd2" placeholder="password confirm" value="111111"></p>
        <p><input type="text" name="displayName" placeholder="displayName" value="egoing"></p>
        <p>
          <input type="submit" value="register">
        </p>
      </form>
      `,
            ''
        );
        response.send(html);
    });

    router.post('/register_process', (request, response) => {
        var post = request.body;
        var email = post.email;
        var pwd = post.pwd;
        var pwd2 = post.pwd2;
        var displayName = post.displayName;

        if (pwd != pwd2) {
            request.flash('error', 'Password must same!');
            response.redirect('/auth/register');
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(pwd, salt, function(err, hash) {
                    var user = {
                        id: shortid.generate(),
                        email: email,
                        password: hash,
                        displayName: displayName
                    };
                    db.get('users')
                        .push(user)
                        .write();

                    // 회원가입 성공 후 바로 로그인 시키기
                    request.login(user, function(err) {
                        return response.redirect('/');
                    });
                });
            });
        }
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
    return router;
};
