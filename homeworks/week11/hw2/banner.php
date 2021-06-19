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