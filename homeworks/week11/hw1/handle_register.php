<?php
    session_start();
    require_once("conn.php");
    require_once('utils.php');

    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];
    
    if($username || $authority){
        header('Location: index.php');
        die();
    }

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    //空字串經過 hash 還是可能產生長度，要防止
    if(empty($password)){
        header('Location: register.php?errorCode=1');
        die();
    }

    // 密碼特殊符號檢查
    if (preg_match('/\W/', $password)) {
        header('Location: register.php?errorCode=3');
        die();
    }

    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    if (
        empty($nickname) || 
        empty($username) ||
        empty($password)
    ) {
        header('Location: register.php?errorCode=1');
        die($conn->error);
    }
    
    // 帳號特殊符號檢查
    if (preg_match('/\W/', $username)) {
        header('Location: register.php?errorCode=3');
        die();
    }

    $sql = "INSERT INTO chinghsuan_board_users(username, password, nickname) VALUES(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $username, $password, $nickname);
    $result = $stmt->execute();
    if(!$result) {
        $code = $conn->errno;
        if($code === 1062){
            header('Location: ./register.php?errorCode=2');
        }
        die($conn->error);
    }
    $_SESSION['username'] = $username;
    header("Location: index.php");
?>