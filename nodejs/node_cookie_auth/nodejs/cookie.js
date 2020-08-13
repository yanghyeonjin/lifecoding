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
        'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`, // Max-Age: 얼마동안 살아있을 것인가.. 초 단위로 입력
            'SecureCookieName=SecureCookieValue; Secure', // https에서만 쿠키 생성됨
            'HttpOnlyCookieName=HttpOnlyCookieValue; HttpOnly', // http 통신에서만 쿠키 확인 가능. 자바스크립트를 통해 접근 불가
            'PathCookieName=PathCookieValue; Path=/cookie', // 특정 path에서만 쿠키가 살아있도록
            'Domain=Domain; Domain=o2.org' // 서브 도메인이 와도 살아 남는다.
        ]
    });
    response.end('Cookie!!');
}).listen(3000);
