<?php
    // function generateToken() {
    //     $s = '';
    //     for($i = 1; $i <= 16; $i++) {
    //         $s .= chr(rand(65, 90));
    //     }
    //     return $s;
    // }

    function getUserFromUsername($username) {
        global $conn;
        $sql = "SELECT * FROM chinghsuan_board_users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        return $row;
    }

    function isAdmin($username, $authority){
        if(!$username || $authority !== 'admin'){
            header('Location: index.php');
            die();
        }
    }

    function hasPermission($username, $authority){
        if(!$username || !$authority){
            header('Location: index.php');
            die($conn->error);
        }
    }
    
    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }


?>