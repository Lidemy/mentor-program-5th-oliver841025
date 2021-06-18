<?php
// 先載入該載的
  session_start();
  require_once("conn.php");
  // require_once("utils.php");

  // 拿 GET 過來的 id
  $id = $_GET['id'];

  // 其一為空，就提醒
  if(!$id){
    header("Location: admin.php?errCode=1");
    die();
  }

  // 準備 sql 語法
  $sql = 'UPDATE chinghsuan_blog_articles SET is_deleted=1 WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header("Location: admin.php");
?>