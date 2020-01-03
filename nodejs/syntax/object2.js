var f = function() {
    console.log(1 + 1);
    console.log(1 + 2);
};

console.log(f);
f();

var a = [f];
console.log(a[0]);
a[0]();

var o = {
    func: f
};
o.func();

// array, object는 서로 연관된 데이터를 담는 그릇이다.
// 함수도 배열과 객체에 담을 수 있다.
