// 1. 현재 웹페이지의
// 2. 모든 텍스트에서
var entireText = document.getElementsByTagName('body')[0].innerText; // body 태그 하위에 있는 모든 텍스트 가져옴.

// 3. 단어들을 쪼갠 후에
var splitedText = entireText.split(' ');

// 4. 등장 횟수를 계산하고
var countedWord = {};

for (var i = 0; i < splitedText.length; i++) {
    var word = splitedText[i].toLowerCase(); // 대소문자 구분 X

    if (countedWord[word] == undefined) {
        // 값이 정해지지 않았다면
        // 분리한 단어를 property로 주입한 후 1로 초기화 (처음 등장했음을 의미)
        countedWord[word] = 1;
    } else {
        countedWord[word] = countedWord[word] + 1;
    }
}
// 5. 정렬한 후에

// 정렬하기 위해 배열로 이동
var countedWordArr = new Array();
for (var key in countedWord) {
    countedWordArr.push([key, countedWord[key]]);
}

countedWordArr.sort(function (a, b) {
    // a와 b는 [key, countedWord[key]]의 형태로 들어있음. (배열임.)
    return b[1] - a[1];
})
// 6. 콘솔창에 출력한다. -> 북마크해서 사용자에게 보여주기 위해 alert으로 변경
var str = '';
for (var i = 0; i < countedWordArr.length; i++) {
    str = str + (countedWordArr[i][0] + " : " + countedWordArr[i][1]) + "\n";
}

alert(str);