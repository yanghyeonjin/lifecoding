const testFolder = "./nodejs/data";
const fs = require("fs");

// testFolder > 실행하는 위치를 기준으로 읽고 싶은 폴더
fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist); // 배열 형태로 파일목록을 불러옴
});
