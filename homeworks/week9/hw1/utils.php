<?php
    function generateToken() {
        $s = '';
        for($i = 1; $i <= 16; $i++) {
            $s .= chr(rand(65, 90));
        }
        return $s;
    }

    function getUserFromUsername($username) {
        global $conn;
        $sql = sprintf(
            "select * from chinghsuan_board_users where username = '%s'",
            $username
        );
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        
        return $row;
    }
?>