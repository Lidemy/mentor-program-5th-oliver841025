<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $content = $_POST['content'];

    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];

    if(!$username || $authority === 'blocked_user'){
        header('Location: index.php');
        die();
    }

    if (empty($content)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }
    
    $content = $_POST['content'];

    $sql = "INSERT INTO chinghsuan_board_comments(username, content) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $content);
    $result = $stmt->execute();


    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>