<?php
    require_once('conn.php');
    header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
    header("Access-Control-Allow-Origin: *");
    // 取得 site_key
    $site_key = $_GET['site_key'];

    // 檢查任一是否為空
    if(
        empty($site_key)
    ){
        $json = array(
            "ok" => false,
            "message" => "Please check site_key in url"
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    // 不為空就繼續
    $site_key = $_GET['site_key'];
    $before = $_GET['before'];

    // sql 語法準備
    if(empty($before)){
        $sql = "SELECT * FROM chinghsuan_discussions WHERE site_key = ? ORDER BY id DESC LIMIT 5 ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $site_key);
    }else{
        $sql = "SELECT * FROM chinghsuan_discussions WHERE (site_key = ? AND id<?) ORDER BY id DESC LIMIT 5 ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si', $site_key, $before);
    }

    $result = $stmt->execute();

    // result 錯誤處理
    if(!$result){
        $json = array(
            "ok" => false,
            "message" => "something went wrong"
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $result = $stmt->get_result();
    $discussions = array();
    while($row = $result->fetch_assoc()){
        array_push($discussions, array(
            "id" => $row['id'],
            "nickname" => $row['nickname'],
            "content" => $row['content'],
            "created_at" => $row['created_at'],
        ));
    }
    
    $json = array(
        "ok" => true,
        "discussions" => $discussions,
    );
    $response = json_encode($json);
    echo $response;
?>
