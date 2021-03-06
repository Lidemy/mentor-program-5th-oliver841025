<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];

  $category_name = $_GET['name'];

  $sql = "SELECT * FROM chinghsuan_blog_articles WHERE is_deleted=0";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
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
          <li><a href="about.php">關於我</a></li>
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
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php while($row = $result->fetch_assoc()){ ?>
          <?php if($row['category'] === $category_name){ ?>
            <article class="post">
              <div class="post__header">
                <div><?php echo escape($row['title']) ?></div>
                <?php if($authority === 'admin'){ ?>
                  <div class="post__actions">
                    <a class="post__action" href="update_article.php?id=<?php echo $row['id'] ?>">編輯</a>
                  </div>
                <?php } ?>
              </div>
              <div class="post__info">
                <?php echo escape($row['created_at']) ?>
              </div>
              <div class="post__content general_content">
                <?php echo escape($row['content']) ?>
              </div>
              <a class="btn-read-more" href="blog.php?id=<?php echo $row['id'] ?>">READ MORE</a>
            </article>
          <?php } ?>
        <?php } ?>
        <?php
          if(!empty($_GET['errCode'])) {
            $errCode = $_GET['errCode'];
            $msg="";
            if($errCode === '1') {
                $msg = '此分類已不存在';
                echo '<h2 class="errMsg">' . $msg . '</h2>';
            } 
          }
        ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  <script>
    
  </script>
</body>
</html>