<?php
// 先載入該載的
  session_start();
  require_once("conn.php");
  // require_once("utils.php");

  // 拿傳過來的 username, password
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 如果 username 或 password 其一為空的話，就提醒
  if(empty($username) || empty($password)){
    header("Location: login.php?errCode=1");
    die();
  }

  // 準備 sql 語法
  $sql = 'SELECT * FROM chinghsuan_blog_users WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  
  // 確認有找到資料
  if($result->num_rows === 0){
    header("Location: login.php?errCode=2");
    die();
  }

  // 檢查身份是否為管理員
  if($row['authority'] !== 'admin'){
    header('Location: login.php?errCode=2');
    die();
  }

  // 建立 token 並儲存
  if(password_verify($password, $row['password'])){
    $_SESSION['username'] = $row['username'];
    header("Location: index.php");
  }else{
    header("Location: login.php?errCode=2");
    die();
  }
?>