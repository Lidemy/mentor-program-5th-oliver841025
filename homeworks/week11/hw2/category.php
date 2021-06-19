<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];

  $sql = "SELECT * FROM chinghsuan_blog_categories";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>

<?php include_once('banner.php') ?>
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
        <?php while($row = $result->fetch_assoc()){ ?>
          <a class="list_link" href="show_articles_in_category.php?name=<?php echo escape($row['name']) ?>">
            <div class="admin-post">
              <div class="admin-post__title">
                  <?php echo escape($row['name']) ?>
              </div>
              <div class="admin-post__info">
                <div class="admin-post__created-at">
                  <?php echo escape($row['created_at']) ?>
                </div>
              </div>
            </div>
          </a>
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
</body>
</html>