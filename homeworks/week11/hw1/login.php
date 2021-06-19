<?php
    require_once('conn.php');
    require_once('utils.php');
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
        <h2 class="title">Login</h2>
        <div class="btn-board__block">
            <a class="btn-board" href="register.php">Register</a>
            <a class="btn-board" href="index.php">Home</a>
        </div>
        <form class="wrapper" method="POST" action="handle_login.php">
            <div>Username:<input name="username" type="text"/></div>
            <div>Password:<input name="password" type="password"/></div>
            <?php
                if(!empty($_GET['errorCode'])) {
                    $errorCode = $_GET['errorCode'];
                    $msg="";
                    if($errorCode === '1') {
                        $msg = 'Information Incomplete';
                        echo '<h2 class="errorMsg">' . $msg . '</h2>';
                    } else if($errorCode === '2') {
                        $msg = 'Please check your username or password again';
                        echo '<h2 class="errorMsg">' . $msg . '</h2>';
                    }
                }
            ?>
            <div class="btn-submit__block">
                <input class="btn-submit" name="btn-submit" type="submit" value="submit"></input>
            </div>
        </form>
    </main>
</body>
</html>