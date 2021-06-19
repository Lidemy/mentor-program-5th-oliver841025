<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];
    
    hasPermission($username, $authority);

    $nickname = $_POST['nickname'];
    if (empty($nickname)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }
    
    $username = $_SESSION['username'];
    $sql = "UPDATE chinghsuan_board_users SET nickname=? WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $nickname, $username);
    $result = $stmt->execute();

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>