var args = process.argv;
console.log(args[2]); // output: [node.js runtime이 어디에 위치하는지, 우리가 실행시킨 파일의 경로, console argument1, console argument2, ...]

console.log("A");
console.log("B");
if (args[2] === "1") {
    // args[2] 부터 첫번째 인자..
    console.log("C1");
} else {
    console.log("C2");
}
console.log("D");
