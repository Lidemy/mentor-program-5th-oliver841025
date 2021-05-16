## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

- <article> 標記定義一篇文章
- <embed> 標記定義外部的可互動的內容或外掛 比如 flash
- <mark> 標記定義有標記的文字 (黃色選中狀態)

## 請問什麼是盒模型（box modal）

- 每一個元素都可視為盒模型
- 盒模型由 content、padding、border、margin 組成
  - content：要放的內容物
  - padding：內距，內容物跟 border 的距離，換句話說，在元素內容的周圍加上我們所指定大小的空間；而如果我們沒有指定元素的寬高時，那麼該元素的內容就會受到 padding 所擠壓
  - border：邊框，盒模型的最外框，計算元素實際的寬高時，一定要將 border 納入
  - margin：元素與其他元素間的邊界距離

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

- 塊級元素：佔領頁面的一行，之後的塊級元素自動換行，可設定寬高、margin、padding 等，但設置後也同樣佔一行。
- 行級元素：和其他元素在同一行，寬高不可設定，寬高由內容由內容元素的寬高決定，多個相鄰的行內元素排在同一行裏，直到頁面一行排列不下，才會換新的一行。

1. inline

- 屬於行級元素
- 常見元素： input、img、strong、em
- 使用時機：要讓他跟其他資料一起排列時

2. block

- 屬於塊級元素
- 常見元素：div、form、p、h1
- 使用時機：自成一橫列，不與其他元素做排列，想做比較重要的訊息或較顯眼的資訊時

3. inline-block

- 上面兩者優點混合
- 可在同一行內做元素寬高的設定、同時可以一起做排列，block 的寬度高度特性 + inline 的同行特性
- 使用時機：導覽列

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

1. static

- 預設定位，無法定義 top、left、bottom、right、z-index
- 使用時機：一般狀況

2. relative

- 元素與 static 位置相同 (**元素實際還是在 static 的位置，並非偏移過後的位置**)
- 可定義 top、left、bottom、right、z-index
  - right 40px 相對於原本的位置，向右移動 40px
- 使用時機：把 static 改成 relative 以達到讓 absolute 或是 relative 追蹤的效果

3. absolute

- 移出資料流，做獨立編排。將預設的 static 設為 absolute，他就會往外層元素找 position:absolute|fixed |relative 的元素，**若是都沒有就會以該網頁頁面 body 的左上角為定位點**
- 可設定 top、left、bottom、right，移動方式同 relative
- 使用時機：跳出廣告關閉的 XX 按鈕

4. fixed

- 移出資料流，以目前瀏覽器視窗定位，固定在視窗固定位置，不隨滾動捲軸移動，
- 使用時機：廣告或彈出視窗
