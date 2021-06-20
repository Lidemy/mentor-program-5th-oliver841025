<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $username = $_SESSION['username'];
  $authority = getDataFromUsername($username)['authority'];
?>

<?php include_once('banner.php') ?>
  <div class="container-wrapper">
    <div class="posts">
        <article class="post only-avatar">
          <img src="https://i.pinimg.com/originals/8e/1e/12/8e1e12be85594d1438b9ab8585b1670e.gif"/>
        </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>