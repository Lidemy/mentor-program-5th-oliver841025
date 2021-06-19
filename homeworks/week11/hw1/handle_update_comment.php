<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = $_SESSION['username'];
    $content = $_POST['content'];
    $id = $_POST['id'];
    $authority = getUserFromUsername($username)['authority'];

    if (empty($content) || !$username || !$authority) {
        header('Location: index.php?errorCode=1&id='.$id);
        die($conn->error);
    }

    $sql = "UPDATE chinghsuan_board_comments SET content=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
    $result = $stmt->execute();

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>