<?php
    require_once('conn.php');
    header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
    header("Access-Control-Allow-Origin: *");

    // 第一次存的使用者，可以得到一組隨機 user_id
    function generateID(){
        $new_user_id = '';
        for($i = 1; $i <= 10; $i++){
            $new_user_id .= chr(rand(65, 90));
        }
        return $new_user_id;
    }

    

    if(empty($_POST['todos'])){
        $json = array(
            "ok" => false,
            "message" => 'no todos'
        );
        $response = json_encode($json);
        echo $response;
        die();
    }else{
        $todos = $_POST['todos'];
    }

    // 有傳來使用者 id
    if(!empty($_POST['user_id'])){ 
        $user_id = $_POST['user_id'];
        $sql = 'UPDATE chinghsuan_todoList SET content=? WHERE user_id=?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $todos, $user_id);
        $result = $stmt->execute();
        if(!$result){
            $json = array(
                "ok" => false,
                "message" => $conn->error
            );
        }else{
            $json = array(
                "ok" => true,
                "message" => '更新成功！',
                'user_id' => $user_id
            );
        }
        $response = json_encode($json);
        echo $response;
        die();
    } 
    
    // 沒有傳來使用者 id
    if(empty($_POST['user_id'])){
        $user_id = generateID();
        $sql = 'INSERT INTO chinghsuan_todoList(content, user_id) VALUES(?, ?)';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $todos, $user_id);
        $result = $stmt->execute();
        if(!$result){
            $json = array(
                "ok" => false,
                "message" => $conn->error
            );
        }else{
            $json = array(
                "ok" => true,
                "message" => '儲存成功！',
                'user_id' => $user_id
            );
        }
        $response = json_encode($json);
        echo $response;
        die();
    } 
?>