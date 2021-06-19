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

<?php include_once('banner.php') ?>
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
            <?php echo escape($article_row['created_at']) ?><span class="index_category_span"><?php echo escape($article_row['category']) ?></span>
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