<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 檢查身份
  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];

  isAdmin($username, $authority);

  // 拿文章資料
  $sql = "SELECT * FROM chinghsuan_blog_articles WHERE is_deleted=0 ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>

<?php include_once('banner.php') ?>
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php while($row = $result->fetch_assoc()){ ?>
          <div class="admin-post">
            <div class="admin-post__title">
                <?php echo escape($row['title']) ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['created_at']) ?>
              </div>
              <a class="admin-post__btn" href="update_article.php?id=<?php echo $row['id'] ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="delete_article.php?id=<?php echo $row['id'] ?>">
                刪除
              </a>
            </div>
          </div>
        <?php } ?>
        <?php
          if(!empty($_GET['errCode'])) {
            $errCode = $_GET['errCode'];
            $msg="";
            if($errCode === '1') {
                $msg = '此文章已不存在';
                echo '<h2 class="errMsg">' . $msg . '</h2>';
            } 
          }
        ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>