var http = require('http');
http.createServer(function(request, response) {
    // 서버에서 응답으로 쿠키 설정해주고 주석처리 > reload
    // response.writeHead(200, {
    //     'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
    // });
    response.end('Cookie!!');
}).listen(3000);
