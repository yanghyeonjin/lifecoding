<?php
// Local JSON 파일 읽어오기
$url = './google-oauth-client-secret.json';

if (!file_exists($url)) {
    echo '파일이 없습니다.';
    exit;
}

$jsonStr = file_get_contents($url);
$jsonArr = json_decode($jsonStr, true);

// json_decode : JSON 문자열을 PHP 배열로 바꾼다
// json_decode 함수의 두번째 인자를 true 로 설정하면 무조건 array로 변환된다.

$googleClientId = $jsonArr['web']['client_id'];


// 출처: https://link2me.tistory.com/1467 [소소한 일상 및 업무TIP 다루기]
?>

<html>

<body>
    <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http%3A%2F%2Flocalhost%3A81%2Flifecoding%2Ffast_web_recipe%2Fgoogle-oauth-redirect.php&client_id=<?php echo $googleClientId ?>">구글 API를 사용할 수 있도록 허용하러 가기</a>
</body>

</html>