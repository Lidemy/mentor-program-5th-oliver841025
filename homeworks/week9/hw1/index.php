<?php
    session_start();
    require_once("conn.php");
    require_once('utils.php');

    $username = NULL;
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
    }

    $sql ="select * from chinghsuan_board_comments order by id desc";
    $result = $conn->query($sql);
    if(!$result) {
        die('Error:' . $conn->error);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comment</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap" rel="stylesheet">
</head>
<body>
    <header class="warning">Please DO NOT type in your real password or username !!!</header>

    <main class="comments__body">
        <h2 class="title">Comment</h2>
        <div class="btn-board__block">
            <?php if(!$username) { ?>
                <a class="btn-board" href="login.php">Login</a>
                <a class="btn-board" href="register.php">Register</a>
            <?php } else { ?>
                <a class="btn-board" href="logout.php">Logout</a>
                <h3>Hello！<?php echo $username; ?></h3>
            <?php } ?>
        </div>
        <?php if($username) { ?>
            <form class="wrapper" method="POST" action="handle_add_comment.php">
                <?php
                    if(!empty($_GET['errorCode'])) {
                        $errorCode = $_GET['errorCode'];
                        $msg="";
                        if($errorCode = '1') {
                            $msg = 'Information Incomplete';
                            echo '<h2 class="errorMsg">' . $msg . '</h2>';
                        }
                    }
                ?>
                <textarea name='content' class="comment" row="20" placeholder="Wanna say something...?"></textarea>
                <div class="btn-submit__block">
                    <input class="btn-submit" name="btn-submit" type="submit" value="submit"></input>
                </div>
            </form>
            <hr />
        <?php } else { ?>
            <h3 class="not-loggin__msg">Please Login To Leave Messages</h3>
            <hr />
        <?php } ?>
        <ul class="contents">
            <?php
                while($row = $result->fetch_assoc()) {?>
                    <li class="content">
                        <div class="content__avatar"></div>
                        <div class="content__info">
                            <div class="author"><?php echo $row['nickname'] ?><span class="time"><?php echo $row['created_at'] ?></span></div>
                            <p><?php echo $row['content'] ?></p>
                        </div>
                    </li>
            <?php } ?>
        </ul>
    </main>
</body>
</html>