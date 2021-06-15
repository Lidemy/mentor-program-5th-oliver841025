<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $content = $_POST['content'];
    $id = $_POST['id'];
    $username = $_SESSION['username'];

    if (empty($content)) {
        header('Location: ./index.php?errorCode=1&id='.$id);
        die($conn->error);
    }
    
    $sql = "update chinghsuan_board_comments set content=? where id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
    $result = $stmt->execute();


    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>