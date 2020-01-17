var http = require('http');
var cookie = require('cookie'); // 쿠키를 다루기 쉽도록 해주는 모듈

http.createServer(function(request, response) {
    var cookies = {};
    if (request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie);
        console.log(cookies);
        console.log(cookies.tasty_cookie);
    }
    console.log(cookies.yummy_cookie);

    response.writeHead(200, {
        'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
    });
    response.end('Cookie!!');
}).listen(3000);
