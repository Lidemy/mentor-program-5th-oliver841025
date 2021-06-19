<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $content = $_POST['content'];
    $id = $_POST['id'];
    
    if (empty($content)) {
        header('Location: ./index.php?errorCode=1&id='.$id);
        die($conn->error);
    }
    
    $sql = "UPDATE chinghsuan_board_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
    $result = $stmt->execute();

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>