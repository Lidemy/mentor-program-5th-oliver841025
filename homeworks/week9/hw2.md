## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

- varchar

  - 可變長度的字串，最多 65,535 個字元
  - 可以設定最大長度，適合用在文字量少的欄位或是明確知道要儲存的長度限制，可以有預設值
  - 查詢速度較快

- text
  - 最大長度不變，固定是 65,535 個字元
  - 不可限制最大長度
  - 適合用在明確知道儲存長度限制或文字量較多的欄位
  - 查詢速度較慢

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

- HTTP 是一個無狀態協議（Stateless Protocol），因此對於 Server 來說並不能每次都分辨來自 Client 端的請求之間的關係

簡單說 Cookie 就是一個小型文檔，特性之一是建立後會跟著 Client 發出的 Request 自動帶到 Server。

Cookie 主要有三個目的：

1. Session 管理
2. 個人化設定
3. 記錄並分析使用者行為

Server 可透過 HTTP Response 把資料寫到 Cookie，在 Server 的 Response 中有個 Header 需要設定 setCookie:.....，裡面即可放置資訊回傳給瀏覽器，像是辨識使用者身分的 token，舉例以身份辨識來說，所有的 Request 瀏覽器都會自動將 Cookie 帶上去，讓 Server 可以辨識這個身份。

Cookie 用法如下 (舉 token 為例)：

1. setCookie("token", "$token", 到期時間) // 登入時暫存
2. setCookie("token", "$", 到期時間設成負值) // 登入出清除 token

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

- 如果攻擊者誘使我們使用特定的 Session ID 登入網站，應該就能取得我們的身份

- 在 Server 回傳 response 的過程，目前無任何防止竊聽的機制，如被竊聽，攻擊者就能輕易代替我們發送 request 給 Server，Server 若無嚴格審查機制（來源 IP 位置或是瀏覽器 User-Agent），我們的身份將被頂替

- 密碼或許可再使用加密方法加密
