<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];
    
    // 已登入者不能再登入 
    if($username || $authority){
        header('Location: index.php');
        die();
    }

    $username = $_POST['username'];
    $password = $_POST['password'];
    if (
        empty($username) || 
        empty($password)
    ) {
        header('Location: ./login.php?errorCode=1');
        die($conn->error);
    }

    $sql = "SELECT * FROM chinghsuan_board_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();

    if(!$result) {
        die($conn->error);
    } 

    if($result->num_rows === 0) {
        header("Location: login.php?errorCode=2");
        exit();
    }

    $row = $result->fetch_assoc();
    if(password_verify($password, $row['password'])) { 
        // 建立 token 並儲存
        $_SESSION['username'] = $username;
        header('Location: ./index.php');
    } else {
        header('Location: ./login.php?errorCode=2');
    }
        
?>