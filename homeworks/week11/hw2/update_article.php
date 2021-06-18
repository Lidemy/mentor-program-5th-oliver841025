<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];
  
  if(!$username || $authority !== 'admin'){
    header('Location: index.php');
    die();
  }
  
  // GET 拿丟過來的 id
  $id = $_GET['id'];
  
  // 先從資料庫撈出所有資訊
  $sql = 'SELECT * FROM chinghsuan_blog_articles WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 取出 title, content, category
  $title = $row['title'];
  $content = $row['content'];
  $category = $row['category'];
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>ChingHsuan's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="list.php">文章列表</a></li>
          <li><a href="category.php">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <?php if($username && $authority === 'admin'){ ?>
            <li><a href="add_article.php">發表文章</a></li>
            <li><a href="admin.php">管理後台</a></li>
          <?php } ?>
          <?php if(!$username){ ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
          <?php if($username){ ?>
            <li><a href="logout.php">登出</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <div class="container-wrapper new-post_form">
    <div class="posts">
      <article class="post">
        <h3 class="new-post_title" >編輯文章：</h3>
        <?php
          if(!empty($_GET['errCode'])) {
            $errCode = $_GET['errCode'];
            $msg="";
            if($errCode === '1') {
              $msg = '任一欄位勿留白';
              echo '<h2 class="errMsg">' . $msg . '</h2>';
            } 
          }
        ?>
        <form method="POST" action="handle_update_article.php" >
          <div class="input__wrapper">
            <input class="input__field" type="text" name="title" value='<?php echo $title ?>'/>
          </div>
          <div class="new-post_select">
            <select name="category">
              <option value="<?php $category ?>"><?php echo $category ?></option>
              <?php if($category === 'tech'){ ?>
                <option value="music">music</option>
                <option value="politic">politic</option>
                <option value="diary">diary</option>
              <?php }else if($category === 'music'){ ?>
                <option value="tech">tech</option>
                <option value="politic">politic</option>
                <option value="diary">diary</option>
              <?php }else if($category === 'politic'){ ?>
                <option value="tech">tech</option>
                <option value="music">music</option>
                <option value="diary">diary</option>
              <?php }else if($category === 'diary'){ ?>
                <option value="tech">tech</option>
                <option value="music">music</option>
                <option value="politic">politic</option>
              <?php } ?>
            </select>
          </div>
          <div class="input__wrapper">
            <textarea class="input__field" type="text" name="content" rows="10"><?php echo $content ?></textarea>
          </div>
          <input class="input__field" type="hidden" name="id" value='<?php echo $id ?>'/>
          <button class="btn-add_post" type='submit'>提交</button>
        </form>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>