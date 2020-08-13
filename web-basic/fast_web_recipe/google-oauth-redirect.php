<!-- http://localhost:81/lifecoding/fast_web_recipe/google-oauth-redirect.php?state=state_parameter_passthrough_value&code=4/0QGEVpTmwClELyse0wzJiWbbF8e-VOV0dzIcK7122wfm543iDSiiGBWo_VAEzrXJs6Hj_MY6C8WLznMAtGMVCFE&scope=https://www.googleapis.com/auth/calendar.readonly%20https://www.googleapis.com/auth/calendar -->

<?php
$code = $_GET['code'];

// Local JSON 파일 읽어오기
$url = './google-oauth-client-secret.json';

if (!file_exists($url)) {
    echo '파일이 없습니다.';
    exit;
}

$jsonStr = file_get_contents($url);
$jsonArr = json_decode($jsonStr, true);

$googleClientId = $jsonArr['web']['client_id'];
$googleClientSecret = $jsonArr['web']['client_secret'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        input {
            width: 300px;
        }
    </style>
</head>

<body>
    <!-- POST /token HTTP/1.1 -->
    <!-- Host: oauth2.googleapis.com -->
    <!-- Content-Type: application/x-www-form-urlencoded -->
    <a href="http://localhost:81/lifecoding/fast_web_recipe/google-oauth.php">login</a>
    <form action="https://oauth2.googleapis.com/token" method="POST" enctype="application/x-www-form-urlencoded">
        <label for="">code</label>: <input type="text" name="code" value="<?php echo $code ?>"><br>
        <label for="">client id</label>: <input type="text" name="client_id" value="<?php echo $googleClientId ?>"><br>
        <label for="">client secret</label>: <input type="text" name="client_secret" value="<?php echo $googleClientSecret ?>"><br>

        <!-- code 요청할 때 보냈던 redirect uri와 같게... -->
        <label for="">redirect uri</label>: <input type="text" name="redirect_uri" value="http://localhost:81/lifecoding/fast_web_recipe/google-oauth-redirect.php"><br>
        <label for="">grant type</label>: <input type="text" name="grant_type" value="authorization_code"><br>

        <input type="submit">
    </form>
</body>

</html>