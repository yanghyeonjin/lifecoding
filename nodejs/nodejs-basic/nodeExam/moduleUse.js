// var object = {
//     v: "v",
//     f: function() {
//         console.log(this.v);
//     }
// };
// moduleUse 파일 위치 기준에서 modulePart 파일위치
var part = require("./modulePart.js");
console.log(part);
part.f();

// 객체도 많아지면 모듈로 관리
