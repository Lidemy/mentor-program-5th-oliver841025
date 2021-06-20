<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  // 從 session 取出 username 
  $username = $_SESSION['username'];
  
  // 先從使用者資料庫撈出權限
  $authority = getDataFromUsername($username)['authority'];
  
  // 檢查權限
  isAdmin($username, $authority);
  
  $sql = 'SELECT * FROM chinghsuan_blog_categories';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
?>

<?php include_once('banner.php') ?>
  <div class="container-wrapper new-post_form">
    <div class="posts">
      <article class="post">
        <h3 class="new-post_title" >發表文章：</h3>
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
        <form method="POST" action="handle_add_article.php" >
          <div class="input__wrapper">
            <input class="input__field" type="text" name="title" placeholder="請輸入文章標題"/>
          </div>
          <div class="new-post_select">
            <select name="category">
              <option>請選擇分類</option>
              <?php while ($row = $result->fetch_assoc()){?>
                <option value="<? echo escape($row['name'])?>"><? echo escape($row['name'])?></option>
              <?php } ?>
            </select>
          </div>
          <div class="input__wrapper">
            <textarea class="input__field" type="text" name="content" rows="10"></textarea>
          </div>
          <button class="btn-add_post" type='submit'>新增</button>
        </form>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>