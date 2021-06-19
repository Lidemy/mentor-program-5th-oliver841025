<?php
// 先載入該載的
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];
  
  isAdmin($username, $authority);

  // 拿傳過來的 title, content, category, id
  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  $category = $_POST['category'];

  // 其一為空，就提醒
  if(empty($title) || empty($content) || empty($category)){
    header("Location: update_article.php?id=" . $id . "&errCode=1");
    die();
  }

  // 準備 sql 語法
  $sql = 'UPDATE chinghsuan_blog_articles SET title=?, content=?, category=? WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssi", $title, $content, $category, $id);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header("Location: index.php");
?>