<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $id = $_GET['id'];
    $username = $_SESSION['username'];
    
    if (empty($id)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }
    
    $sql = "UPDATE chinghsuan_board_comments SET is_deleted=1 WHERE id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    $result = $stmt->execute();


    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>