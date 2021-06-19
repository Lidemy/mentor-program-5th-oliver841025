<?php
// 要拿 username, authority
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL;
    $authority = NULL;
    
    // 確認身份不為空
    if(empty($_SESSION['username'])) {
        header("Location: index.php");
        die();
    }
    
    $username = $_SESSION['username'];

    // 取得 users 資料
    $sql = "SELECT * FROM chinghsuan_board_users";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    if(!$result) {
        die('資料獲取失敗' . $conn->error);
    }
    $result = $stmt->get_result();
    $authority = getUserFromUsername($username)['authority'];

    // 驗證身份
    if($authority !== 'admin') {
        header("Location: index.php");
        die();
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Only</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap" rel="stylesheet">
</head>
<body>
    <header class="warning">Please DO NOT type in your real password or username !!!</header>
    <main class="comments__body">
        <div>
            <h2 class="title">Admin Only</h2>
            <button class="admin-only_btn" ><a href="index.php">back to comments</a></button>
        </div>
        <?php while($row = $result->fetch_assoc()) { ?>
            <form class="auth_select_block" method="POST" action="handle_authority.php">
                <div>
                    (@<?php echo escape($row['username']) ?>)
                    <?php echo escape($row['nickname']) ?>
                    <select name="authority">
                    <!-- option 加上 value 才能傳到後端 -->
                        <option value="admin" <?php echo $row['authority'] === 'admin' ? 'selected' : '' ?>>master admin</option>
                        <option value="general_user" <?php echo $row['authority'] === 'general_user' ? 'selected' : '' ?>>general</option>
                        <option value="blocked_user" <?php echo $row['authority'] === 'blocked_user' ? 'selected' : '' ?>>blocked</option>
                    </select>
                    <input type="hidden" name="id" value="<?php echo $row['id'] ?>" ></input>
                    <button type="submit" class="btn-update_auth" >submit</button>
                </div>
            </form>
        <?php } ?>
    </main>
    
</body>
</html>