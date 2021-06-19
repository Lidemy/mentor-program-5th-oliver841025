<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL;
    $user = NULL;
    $authority = NULL;
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $row = getUserFromUsername($username);
        $user = $row['username'];
        $authority = $row['authority'];
        $nickname = $row['nickname'];
    }

    $page = 1;
    if(!empty($_GET['page'])){
        $page = intval($_GET['page']);
    }
    $items_per_page = 5;
    $offset = ($page - 1) * $items_per_page;

    $stmt = $conn->prepare(
        'SELECT 
            C.id AS id, C.content AS content, C.created_at AS created_at, 
            U.nickname AS nickname, U.username AS username 
        FROM chinghsuan_board_comments AS C 
        LEFT JOIN chinghsuan_board_users AS U 
            ON C.username = U.username 
        WHERE is_deleted IS NULL 
        ORDER BY 
            C.id DESC 
        LIMIT ? 
        OFFSET ?'
    );
    $stmt->bind_param('ii', $items_per_page, $offset);    
    $result = $stmt->execute();
    if(!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    
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
                <h3>Hello！<?php echo escape($nickname) ?></h3> <span><?php if(!empty($authority) && $authority === 'admin') { ?>
                <button class="admin-only_btn" ><a href="admin.php">admin page</a></button></span>
            <?php } ?>
                <form class="wrapper" method="POST" action="update_user.php"><span class="update_nickname">update nickname</span>
                    <div class="hide new_nickname_block">
                        <span>new nickname:</span>
                        <input class="new_nickname" type="text" name="nickname" />
                        <input class="btn-submit__nickname" type="submit" value="enter"/>
                    </div>
                </form>
            <?php } ?>
        </div>
        <?php if($username && $authority !== 'blocked_user') { ?>
            <form class="wrapper" method="POST" action="handle_add_comment.php">
                <?php
                    if(!empty($_GET['errorCode'])) {
                        $errorCode = $_GET['errorCode'];
                        $msg="";
                        if($errorCode = '1') {
                            $msg = 'Information Incomplete';
                            echo '<h2 class="errorMsg">' . $msg . '</h2>';
                        }else if($errorCode = '2'){
                            $msg = 'you do not have permission';
                            echo '<h2 class="errorMsg">' . $msg . '</h2>';
                        }
                    }
                ?>

                <textarea name='content' class="comment" row="20" placeholder="Wanna say something...?"></textarea>
                <div class="btn-submit__block">
                    <input class="btn-submit" name="btn-submit" type="submit" value="submit"></input>
                </div>
            </form>
            <?php } else if($username && $authority === 'blocked_user') { ?>
                <h3 class="not-loggin__msg">I am sorry, you are blocked</h3>
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
                            <div class="author"><?php echo escape($row['nickname']) ?>(@<?php echo escape($row['username']) ?>)
                            <span class="time"><?php echo escape($row['created_at']) ?></span> 
                            <?php if($row['username'] === $username || $authority === 'admin') { ?>
                                <a href="update_comment.php?id=<?php echo $row['id'] ?>"> edit</a>
                                <a href="delete_comment.php?id=<?php echo $row['id'] ?>"> delete</a>
                            <?php } ?>
                            </div>
                            <p><?php echo escape($row['content']) ?></p>
                        </div>
                    </li>
            <?php } ?>
        </ul>
        <hr />
        <?php 
            $stmt = $conn->prepare(
                'SELECT count(id) AS count FROM chinghsuan_board_comments WHERE is_deleted IS NULL'
            );
            $result = $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $count = $row['count'];
            $total_page = ceil($count / $items_per_page);
         ?>
        <div class="page-info">
            <span>There are <?php echo $count ?> comments, page:</span>
            <span><?php echo $page ?> / <?php echo $total_page ?></span>
        </div>
        <div class="paginator">
            <?php if($page != 1){ ?>
                <a href="index.php?page=1">Home Page</a>
                <a href="index.php?page=<?php echo $page - 1?>">Last</a>
            <?php } ?>
            <?php if($page != $total_page){ ?>
                <a href="index.php?page=<?php echo $total_page ?>">The Last Page</a>
                <a href="index.php?page=<?php echo $page + 1?>">Next</a>
            <?php } ?>
        </div>
    </main>
    <script>
        const btn = document.querySelector(".update_nickname");

        btn.addEventListener('click', function() {
            const form = document.querySelector('.new_nickname_block');
            form.classList.toggle('hide');
        })
    </script>
</body>
</html>