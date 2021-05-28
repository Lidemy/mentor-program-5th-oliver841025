## 什麼是 Ajax？

「Asynchronous JavaScript And XML」，非同步的 JavaScript 與 XML 技術，簡單說就是一種利用 JavaScript 向 server 端發起請求，並獲得 server 端響應的技術。特點是非同步請求，局部刷新，頁面不需要整個刷新，就能即時地透過瀏覽器去跟伺服器溝通，瀏覽器會直接撈出資料 render 出結果

- 任何非同步跟伺服器交換資料的 JavaScript 的統稱
- 非同步請求，局部刷新
- 早期都是用 XML 做為資料格式，現在比較多都用 JSON 格式，但還是叫 Ajax

**補充：**

- 同步：會先等這行程式執行完畢並得到「結果 (response)」才繼續往下執行，確保執行順序。
- 非同步：執行後就不管他了，不等「結果 (response)」回來就繼續往下執行。

一般來說，JavaScript 使用同步非常合理，但牽涉到網路、交換資料等，就不能相提並論，不可能讓使用者按提交後，乾等在那裡，點任何牽涉 JavaScript 的東西都不會有任何反應，只為了等 response 回來才能往下執行，這也讓使用者體驗太差，不說都以為網站當機了！

因此傳遞資料需要使用「非同步」的 JavaScript。

## 用 Ajax 與我們用表單送出資料的差別在哪？

前端傳資料到後端的方式，可以透過表單傳資料到 server，透過表單傳資料到 server 會換頁（到一個新的頁面），action 產生什麼結果會直接出現，

- 有 GET 及 POST 兩種傳送方式，登入的話會用 POST
  - GET 會將參數附加在網址後方，因此參數會外顯。
  - POST 會將參數放在 request 內
- 最陽春的方式，跟 JavaScript 一點關係都沒有，比較像是我要到這個頁面，那要帶什麼東西才能到這個頁面

```
<div class='app'>
<form method='GET' action='https://google.com'>
username: <input name='username'/>
<input type='username'/>
<input type='submit'/>
</form>

```

- 使用 Ajax 是透過 JavaScript 發 request，這樣就不用換頁，是任何非同步跟伺服器交換資料的 JavaScript 的統稱

- 要特別注意的是 html 的內容會是空的，因為我們是用 JavaScript 動態產生內容，因此對於搜尋引擎來說，會認為這個網頁是沒有內容的

透過表單傳資料這個方法，server 在回傳 reponse 時，瀏覽器會直接 render 出結果。
Ajax 的這個方法，server 在回傳 reponse 給瀏覽器後，瀏覽器會再回傳給我們。

## JSONP 是什麼？

現在很少人在用，全名 JSON with padding，可以讓網頁從別的網域要資料。
將 JSON 資料填入 Padding （Padding 就是要呼叫的函式），利用 src 不受同源限制的特性，透過 script 標籤裡的 src 元素繞過同源政策去取得引用外部網站的資源。

ex:

```
<div class='app'>
</div>
<script>
function setData(users){
    console.log(users)<!-- 這裡就可以拿到資料 -->
}
</script>
<script src=''https://test.com/user.js></script> <!-- 假設user.js是回傳的內容 -->
```

上面的做法是 load user.js 這個 JavaScript，這個 JavaScript 幫你執行了
一個 function，把 data 傳進去，我們只要定義好 function，load 載入完成
script 後就會執行我們定義好的 function，就可以就可以拿到資料。

但 JSONP 的缺點就是你要帶的那些參數「 永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST 」，還有很重要的一點是，要使用 JSONP 傳送資料，也要 Server 端有提供 JSONP 的方法（ 意指用 callback function 包起來 ）才行，不然回傳的 Response 就只是字串而已，沒有辦法取得資料。

## 要如何存取跨網域的 API？

首先要先來說說 CORS(跨來源資源共用)與 Same origin policy(同源政策)

- Same origin policy

當我們發送 request 給 google 時，會收到一個 response

`Access to XMLHttpRequest at 'https://google.com' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requestes resource.`

簡單來說就是 response header 沒有 'Access-Control-Allow-Origin' 這個東西，所以我們不能存取他，基於瀏覽器有個政策叫做 Same origin policy(同源政策)

`所謂同源是指兩份網頁具備相同協定、埠號 (如果有指定) 以及主機位置`

簡單說別人的網站跟你就是不同源，除非共用同一個 domain，
所以瀏覽器會預設不同源會把你擋掉，而被擋掉的解法是接下來要說的 CORS

- CORS(跨來源資源共用)

`跨來源資源共用（Cross-Origin Resource Sharing (CORS)）是一種使用額外 HTTP 標頭令目前瀏覽網站的使用者代理取得存取其他來源（網域）伺服器特定資源權限的機制。當使用者代理請求一個不是目前文件來源——例如來自於不同網域（domain）、通訊協定（protocol）或通訊埠（port）的資源時，會建立一個跨來源 HTTP 請求（cross-origin HTTP request）`

簡單說就是當 server 沒有在 response headers 上面加上面加 `Access-Control-Allow-Origin`的話，是絕對沒有辦法拿到 response 的，沒有任何辦法繞過這個限制，所以想拿到這個 response 有兩條路，一條是同源，另一條就是 server 在 response headers 有加 `Access-Control-Allow-Origin`

至於為什麼要有這個限制，最主要的原因是安全性，而這些限制都是瀏覽器加上的，所以一旦脫離瀏覽器，例如在 node.js 上跑，就不會有這些限制

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

先來說說用 node.js 呼叫 API 跟用瀏覽器呼叫 API 的差別

- 用 node.js 呼叫 API

  - 用 node.js 沒有人限制你要傳什麼或接收什麼，沒有加的東西就不會傳到 server

- 用瀏覽器呼叫 API

  - **透過瀏覽器的話會被瀏覽器限制**，而且瀏覽器會預測阻止你做某些事或幫你加一些東西（同源政策、CORS 等）、瀏覽器的版本跟額外資訊，server 端收到的 request 就有額外資訊

  // 瀏覽器有點像是高中交的女朋友的爸爸.....不過瀏覽器是朋友不是敵人啦...

node.js 透過作業透過作業系統發 request 到 server，可以直接拿到 server 的 reponse
瀏覽器上的 JavaScript 透過瀏覽器，瀏覽器再透過作業系統發 request 到 server，server 會透過瀏覽器回傳 reponse

所以就解釋了第四週我們使用 node.js 呼叫 API 沒有跨網域問題，愛發什麼就發什麼，而這週因為使用了瀏覽器呼叫 API，所以就得遵守這些規則
