<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];

  hasPermission($username, $authority);
?>

<?php include_once('banner.php') ?>
  <div class="login-wrapper">
    <h2>Login</h2>
    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <?php
        if(!empty($_GET['errCode'])) {
            $errCode = $_GET['errCode'];
            $msg="";
            if($errCode === '1') {
                $msg = '請再檢查一次你的帳密';
                echo '<h2 class="errMsg">' . $msg . '</h2>';
            } else if($errCode === '2') {
                $msg = '無效帳密';
                echo '<h2 class="errMsg">' . $msg . '</h2>';
            }
        }
      ?>
      <input class="down_submit_login" type='submit' value="登入" />
    </form>
     
  </div>
</body>
</html>