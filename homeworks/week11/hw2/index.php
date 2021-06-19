<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  // 從 session 取出 username 
  $username = $_SESSION['username'];
  
  // 先從使用者資料庫撈出資訊
  $authority = getDataFromUsername($username)['authority'];

  // 頁數計算
  $page = 1;
  if(!empty($_GET['page'])){
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  // 抓文章資料
  // 從資料庫拿
  $article_sql = 'SELECT * FROM chinghsuan_blog_articles WHERE is_deleted=0 ORDER BY id DESC LIMIT ? OFFSET ?';
  $article_stmt = $conn->prepare($article_sql);
  $article_stmt->bind_param('ii', $items_per_page, $offset);
  $article_result = $article_stmt->execute();
  if(!$article_result){
    die($conn->error);
  }
  $article_result = $article_stmt->get_result();
?>

<?php include_once('banner.php') ?>
  <div class="container-wrapper">
    <div class="posts">
      <?php while($article_row = $article_result->fetch_assoc()){ ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($article_row['title']) ?></div>
            <?php if($authority === 'admin'){ ?>
              <div class="post__actions">
                <a class="post__action" href="update_article.php?id=<?php echo $article_row['id'] ?>">編輯</a>
              </div>
            <?php } ?>
          </div>
          <div class="post__info">
            <?php echo escape($article_row['created_at']) ?><span class="index_category_span"><?php echo escape($article_row['category']) ?></span>
          </div>
          <div class="post__content general_content">
            <?php echo escape($article_row['content']) ?>
          </div>
          <a class="btn-read-more" href="blog.php?id=<?php echo $article_row['id'] ?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>
  <?php 
    $sql = "SELECT count(id) AS count FROM chinghsuan_blog_articles WHERE is_deleted=0";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    $count = $row['count'];
    $total_page = ceil($count / $items_per_page);
  ?>
  <div class="switch_page_block">
    <div class="page_info">
      <span>總共有 <?php echo $count ?> 篇</span>
      <span>，現在在第<?php echo $page ?> / <?php echo $total_page ?> 頁</span>
    </div>
    <div class="paginator">
      <?php if($page != 1){ ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if($page != $total_page){ ?>
        <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>
        <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>