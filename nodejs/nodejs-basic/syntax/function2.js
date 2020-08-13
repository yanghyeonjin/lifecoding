console.log(Math.round(1.6)); // 2
console.log(Math.round(1.4)); // 1

function sum(first, second) {
    // first, second는 parameter
    // console.log(first + second);

    return first + second; // return 시 함수는 종료된다. 따라서 아래 명령은 실행되지 않음.
    console.log("b");
}
// sum(2, 4); // 2, 4는 argument
console.log(sum(2, 4));
