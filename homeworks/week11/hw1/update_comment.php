<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL;
    $user = NULL;
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }

    $id = $_GET['id'];
    $stmt = $conn->prepare(
        'SELECCT * FROM chinghsuan_board_comments WHERE id=?'
    );

    $stmt->bind_param("i", $id);

    $result = $stmt->execute();
    if(!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
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
        <h2 class="title">Edit Comment</h2>
        <?php if($username) { ?>
            <form class="wrapper" method="POST" action="handle_update_comment.php">
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
                <textarea name='content' class="comment" row="20" ><?php echo $row['content'] ?></textarea>
                <input type="hidden" name="id" value="<?php echo $row['id'] ?>"></input>
                <div class="btn-submit__block">
                    <input class="btn-submit" name="btn-submit" type="submit" value="submit"></input>
                </div>
            </form>
        <?php } ?>
    </main>
    
</body>
</html>