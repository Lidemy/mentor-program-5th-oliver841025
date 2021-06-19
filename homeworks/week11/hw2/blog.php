<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $username = $_SESSION['username'];
  // 抓文章資料
  $id = $_GET['id'];
  // 從文章資料庫拿資訊
  $artilce_sql = 'SELECT * FROM chinghsuan_blog_articles WHERE id=?';
  $article_stmt = $conn->prepare($artilce_sql);
  $article_stmt->bind_param('i', $id);
  $article_result = $article_stmt->execute();
  $article_result = $article_stmt->get_result();
  $article_row = $article_result->fetch_assoc();

  // 從使用者資料庫撈出所有資訊
  $authority = getDataFromUsername($username)['authority'];
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
    <div class="posts">
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($article_row['title']) ?></div>
            <?php if($authority === 'admin'){ ?>
              <div class="post__actions">
                <a class="post__action" href="update_article.php?id=<?php echo $id ?>">編輯</a>
              </div>
            <?php } ?>
          </div>
          <div class="post__info">
            <?php echo $article_row['created_at'] ?><span class="index_category_span"><?php echo $article_row['category'] ?></span>
          </div>
          <div class="post__content">
            <?php echo escape($article_row['content']) ?>
          </div>
        </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>