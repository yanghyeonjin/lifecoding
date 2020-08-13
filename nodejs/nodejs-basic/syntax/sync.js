var fs = require("fs");

// readFileSync
// console.log("A");
// var result = fs.readFileSync("./nodejs/syntax/sample.txt", "utf8");
// console.log(result);
// console.log("C");

// output
// A
// B
// C

// --------------------------------------------------------------------------------- //

// readFile(Async)
console.log("A");
fs.readFile("./nodejs/syntax/sample.txt", "utf8", function(err, result) {
    // 콜백: (작업 완료되면) 나중에 전화해 ~~~~
    // 파일을 모두 읽은 다음에 실행
    console.log(result);
});
console.log("C");

// output
// A
// C
// b in sample.txt
