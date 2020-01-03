// var v1 = "v1";
// // 100000줄 코드 존재한다고 가정...
// v1 = "egoing"; // 버그~!
// var v2 = "v2";

// 아래와 같이 변경해야 나중에 좋다.
// 연관있는 친구들은 하나로 묶어주자 ~!
// 객 체 지 향 프 로 그 래 밍 !
var o = {
    v1: "v1",
    v2: "v2",
    f1: function() {
        console.log(this.v1);
    },
    f2: function() {
        console.log(this.v2);
    }
};

o.f1();
o.f2();
