## 請以自己的話解釋 API 是什麼

API (Application Programming Interface)，應用程式介面

- 狹義來說 :

通常是指 Web API，如果今天雙方想要交換資料時，不可能完全把自己的資料庫給對方，這時候就需要限制彼此資料存取的權限，你開出你可以給的資料，我也這樣做，我們根據 API (介面) 讓對方可存取資料，故透過 API 能讓雙方交換資料

- server 提供給你（client）的服務你才可以用，沒給的服務你都不能用
- API 的目的是方便兩者之間的資料交換，交換的資料會透過純文字的形式來交換

* 廣義來說 :

整個框架中任一個有用到函式 / 庫 / 命名都可適用，而不單只是後端公開的 API 接口，今日網路時代，API 絕不止一種，查天氣、查找關鍵字、PO 文、等很多動作，都有使用到 API

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

HTTP 狀態碼表明一個 HTTP 要求是否已經被完成。回應分為五種：

1. 資訊回應 (Informational responses, 1xx)
2. 成功回應 (Successful responses, 2xx)
3. 重定向 (Redirects, 3xx)
4. 用戶端錯誤 (Client errors, 4xx)
5. 伺服器端錯誤 (Server errors, 5xx)

- 102 Processing
  此狀態碼表明伺服器收到並處理請求中，但目前未有回應

- 403 Forbidden
  用戶端並無訪問權限，例如未被授權，所以伺服器拒絕給予應有的回應，但伺服器是知道用戶端的身份的，不同於 401

- 201 Created
  請求成功且新的資源成功被創建，通常用於 POST 或一些 PUT 請求後的回應

- 451 Unavailable For Legal Reasons：因法律問題而無法使用，通常是因為政治敏感因素導致伺服器無法提供該內容。451 典故出自反烏托邦小說《華氏 451 度》，而華氏 451 度為紙的燃點

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

CRUD (Create, Read, Update, Delete)

Base URL: https://lidemy-restaurant.herokuapp.com

| 說明         | Method | path             | 參數                     | 範例                   |
| ------------ | ------ | ---------------- | ------------------------ | ---------------------- |
| 獲取所有餐廳 | GET    | /restaurants     | \_limit:限制回傳資料數量 | /restaurants?\_limit=5 |
| 獲取單一餐廳 | GET    | /restaurants/:id | 無                       | /restaurants/10        |
| 新增餐廳     | POST   | /restaurants     | name: 餐廳名稱           | 無                     |
| 刪除餐廳     | DELETE | /restaurants/:id | 無                       | 無                     |
| 更改餐廳資訊 | PATCH  | /restaurants/:id | name: 餐廳名稱           | 無                     |

## 回傳所有餐廳資料

```JavaScript
const request = require('request');

request({"https://lidemy-restaurant.herokuapp.com", (err, res, body) => {
    // 這裡是你要的內容
});
```

## 回傳單一餐廳資料

```JavaScript
const request = require('request');

request({`https://lidemy-restaurant.herokuapp.com/${id}`, (err, res, body) => {
    // 這裡是你要的內容
});
```

## 刪除餐廳

```JavaScript
const request = require('request');

request({`https://lidemy-restaurant.herokuapp.com/${id}`, (err, res, body) => {
    // 這裡可以加其他內容
});
```

## 新增餐廳

```JavaScript
const request = require('request');

request.post(
    {
        url: "https://lidemy-restaurant.herokuapp.com",
        form: {
            name, // 新餐廳名稱
        },
    },
    (err,res,body) => {
        // 你想放的內容
    }
);
```

## 更改餐廳資訊

```JavaScript
const request = require('request');

request.patch(
    {
        url: `https://lidemy-restaurant.herokuapp.com/${id}`,
        form: {
            name, // 新餐廳名稱
        },
    },
    (err, res,body) => {
        // 你想改的內容
    }
);
```
