<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    //檢查訪問者權限
    if(empty($_SESSION['username'])) {
        header("Location: index.php");
        die();
    }

    $id = $_POST['id'];
    $authority = $_POST['authority'];

    //更新 user 資料
    $sql = "UPDATE chinghsuan_board_users SET authority=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $authority, $id);
    $result = $stmt->execute();

    if(!$result) {
        die('Error: ' . $conn->error);
    } 

    header("Location: admin.php");
    
?>