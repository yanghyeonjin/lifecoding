// 1. 현재 웹페이지의
// 2. 모든 텍스트에서
var entireText = document.getElementsByTagName('body')[0].innerText; // body 태그 하위에 있는 모든 텍스트 가져옴.

// 3. 단어들을 쪼갠 후에
var splitedText = entireText.split(' ');

// 4. 등장 횟수를 계산하고
var countedWord = {};

for (var i = 0; i < splitedText.length; i++) {
    var word = splitedText[i];

    if (countedWord[word] == undefined) {
        // 값이 정해지지 않았다면
        // 분리한 단어를 property로 주입한 후 1로 초기화 (처음 등장했음을 의미)
        countedWord[word] = 1;
    } else {
        countedWord[word] = countedWord[word] + 1;
    }
}
// 5. 정렬한 후에
// 6. 콘솔창에 출력한다.