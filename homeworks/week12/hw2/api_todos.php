<?php
    require_once('conn.php');
    header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
    header("Access-Control-Allow-Origin: *");

    
    $user_id = $_GET['user_id'];

    if(empty($user_id)){
        $json = array(
            "ok" => false,
            "message" => 'no userID'
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $sql = 'SELECT * FROM chinghsuan_todoList WHERE user_id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $user_id);
    $result = $stmt->execute();

    if(!$result){
        $json = array(
            "ok" => false,
            "message" => "no data"
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $result = $stmt->get_result();
    $todos = array();
    while($row = $result->fetch_assoc()){
        array_push($todos, array(
            'id' => $row['id'],
            'content' => $row['content'],
            'user_id' => $row['user_id']
        ));
    }
    $json = array(
        "ok" => true,
        "todos" => $todos
    );
    $response = json_encode($json);
    echo $response;
?>