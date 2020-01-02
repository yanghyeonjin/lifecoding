const fs = require("fs"); // 노드 모듈 중 하나인 파일시스템을 fs 변수를 통해 사용한다

// 현재 실행되고 있는 디렉토리 위치를 기준으로 읽을 파일의 위치를 적어주어야 함
fs.readFile("nodejs/nodeExam/sample.txt", "utf8", function(err, data) {
    console.log(data);
});
