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
    console.log(result);
});
console.log("C");

// output
// A
// C
// b in sample.txt
