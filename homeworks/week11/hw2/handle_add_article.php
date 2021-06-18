<?php
// 先載入該載的
  session_start();
  require_once("conn.php");
  // require_once("utils.php");

  // 拿傳過來的 title, content, category
  $title = $_POST['title'];
  $content = $_POST['content'];
  $category = $_POST['category'];

  // 其一為空，就提醒
  if(empty($title) || empty($content) || empty($category)){
    header("Location: add_article.php?errCode=1");
    die();
  }

  // 準備 sql 語法
  $sql = 'INSERT INTO chinghsuan_blog_articles(title, content, category) VALUES(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $title, $content, $category);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header("Location: index.php");
?>