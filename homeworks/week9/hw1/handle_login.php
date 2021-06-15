<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = $_POST['username'];
    $password = $_POST['password'];
    if (
        empty($username) || 
        empty($password)
    ) {
        header('Location: ./login.php?errorCode=1');
        die($conn->error);
    }
    

    $sql = "select * from chinghsuan_board_users where username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($sql);
    $result = $stmt->execute();
    

    if(!$result) {
        die($conn->error);
    } 

    $result = $stmt->get_result();
    if($result->num_rows === 0) {
        header("Location: login.php?errCode=2");
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