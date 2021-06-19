<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = $_SESSION['username'];
    $authority = getUserFromUsername($username)['authority'];
    
    if($username || $authority){
        header('Location: index.php');
        die();
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
        <h2 class="title">Register</h2>
        <div class="btn-board__block">
            <a class="btn-board" href="login.php">Login</a>
            <a class="btn-board" href="index.php">Home</a>
        </div>
        <form class="wrapper" method="POST" action="handle_register.php">
            <div>Nickname:<input name="nickname" type="text"/></div>
            <div>Username:<input name="username" type="text"/></div>
            <div>Password:<input name="password" type="password"/></div>
            <?php
                if(!empty($_GET['errorCode'])) {
                    $errorCode = $_GET['errorCode'];
                    $msg="error";
                    if($errorCode === '1') {
                        $msg = 'Please Do Not Leave Space';
                        echo '<h2 class="errorMsg">' . $msg . '</h2>';
                    } else if($errorCode === '2') {
                        $msg = 'This account had been used';
                        echo '<h2 class="errorMsg">' . $msg . '</h2>';
                    } else if($errorCode === '3') {
                        $msg = 'Do Not Use Special Chars';
                        echo '<h2 class="errorMsg">' . $msg . '</h2>';
                    }
                }
            ?>
            <input class="btn-submit" name="btn-submit" type="submit" value="submit"></input>
        </form>
    </main>
</body>
</html>