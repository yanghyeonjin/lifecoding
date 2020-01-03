// function a() {
//     console.log("A");
// }
// a();

// 이름이 없는함수 > 익명함수
// 변수로 담아서 호출 가능 하도록 만들어야 한다

var a = function() {
    console.log("A");
};

// a라는 변수가 담고있는 값인 함수를 실행
a();

function slowfunc(callback) {
    callback();
}

slowfunc(a);
