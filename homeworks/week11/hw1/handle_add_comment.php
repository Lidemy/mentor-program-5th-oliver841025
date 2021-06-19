<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $content = $_POST['content'];
    
    if (empty($content)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }
    
    $username = $_SESSION['username'];
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