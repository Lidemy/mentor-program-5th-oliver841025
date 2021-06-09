<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $content = $_POST['content'];
    
    if (empty($content)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }
    
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];

    $sql = sprintf("insert into chinghsuan_board_comments(nickname, content) values('%s', '%s')", $nickname, $content);
    
    $result = $conn->query($sql);

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>