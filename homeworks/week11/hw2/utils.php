<?php
  session_start();
  require_once('conn.php');

  function getDataFromUsername($username){
    // 先從使用者資料庫撈出所有資訊
    global $conn;
    $sql = 'SELECT * FROM chinghsuan_blog_users WHERE username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    return $row = $result->fetch_assoc();
  }
  
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>