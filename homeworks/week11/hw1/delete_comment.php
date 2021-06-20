<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $id = $_GET['id'];
    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];
    
    hasPermission($username, $authority);

    if (empty($id)) {
        header('Location: ./index.php?errorCode=1');
        die($conn->error);
    }

    // 分為管理者與一般使用者
    if($username && $authority === 'admin'){
        $sql = "UPDATE chinghsuan_board_comments SET is_deleted=1 WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
    } else {
        $sql = "UPDATE chinghsuan_board_comments SET is_deleted=1 WHERE id=? AND username=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('is', $id, $username);
    }
    
    $result = $stmt->execute();

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: index.php");
    
?>