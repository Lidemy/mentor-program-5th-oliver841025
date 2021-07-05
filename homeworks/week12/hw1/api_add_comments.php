<?php
    require_once('conn.php');
    header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
    header("Access-Control-Allow-Origin: *");
    // add site_key, nickname, content
    $site_key = $_POST['site_key'];
    $nickname = $_POST['nickname'];
    $content = $_POST['content'];

    // 檢查任一是否為空
    if(
        empty($site_key) ||
        empty($nickname) ||
        empty($content)
    ){
        $json = array(
            "ok" => false,
            "message" => "Please check your input"
        );
        $response = json_encode($json);
        echo $response;
        die();
    }
    // 不為空就繼續
    $site_key = $_POST['site_key'];
    $nickname = $_POST['nickname'];
    $content = $_POST['content'];

    // sql 語法準備
    $sql = 'INSERT INTO chinghsuan_discussions(site_key, nickname, content) VALUES(?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $site_key, $nickname, $content);
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

    $json = array(
        "ok" => true,
        "message" => "success"
    );
    $response = json_encode($json);
    echo $response;
?>
