## 什麼是 DOM？

全名為 Document Object Model，中文為文件（檔案）物件模型。

- 簡單說就是給 HTML 與 XML 文件使用的一組 API，能將其中的標籤、圖片、文字、屬性等轉換成 Object，並以樹狀結構表示，組織在一起稱為「DOM 樹」，每個節點之間可分為「父子」或「兄弟」關係。
- 常用來與 JavaScript 溝通，可以用 JavaScript 來新增、修改、刪除節點。
- DOM 其實可以和任何一種程式語言共同運作，儘管焦點是放在 JavaScript 上。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

- 事件傳遞機制分為三大階段：

  1. 捕獲階段(Capture Phase)
  2. 目標階段(Target Phase)
  3. 冒泡階段(Bubbling Phase)

- 「先補獲，再冒泡」

  - 捕獲階段(Capture Phase)
    這個階段，DOM 會先從祖先層(window)開始往下尋找目標(target)，這過程稱為捕獲階段(Capture Phase)。
  - 目標階段(Target Phase)
    找到目標時，稱為目標階段(Target Phase)。
  - 冒泡階段(Bubbling Phase)
    找到目標後，要循著原路回去，此階段稱為冒泡階段(Bubbling Phase)。

上述階段的順序，就是常常聽到的「先補獲，再冒泡」。

而我們的`addEventListener`預設是在冒泡階段觸發，這邊指的是預設，就是不給第三個參數的情況下，而這第三個參數：true/false 可以決定監聽要在捕獲或是冒泡階段觸發。

- 預設為`false`，為監聽冒泡階段
- 第三個參數改為`true`，則監聽捕獲階段

需要小小注意的地方：
在目標階段(Target Phase)時，不論你的 addEventListener 設為 true/false 都沒有差別，可以想像目標階段是一個點，而捕獲和冒泡想像是一個過程，一個點並不會管 addEventListener 的 true/false，而是跟著程式的順序執行。

以下面的 HTML 當作範例：

```
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li id="list_item">
      <a id="list_item_link" target="_blank" href="http://google.com">
        google.com
      </a>
    </li>
  </ul>
</body>
</html>
```

我們在最外層的 `ul`，加上一個監聽 click 的事件，然後點擊最內層的 `a` 會發生什麼事？

1. 捕獲到 `Window`
2. 捕獲到 `Document`
3. 捕獲到 `<html>`
4. 捕獲到 `<body>`
5. 捕獲到 `<ul>`
6. 捕獲到 `<li>`
7. 抵達目標 `<a>`
8. 冒泡到 `<li>`
9. 冒泡到 `<ul>`
10. 冒泡到 `<body>`
11. 冒泡到 `<html>`
12. 冒泡到 `Document`
13. 冒泡到 `Window`

當我們用 `addEventListener` 來監聽事件時，會在第一個參數傳入要監聽的事件，在第二個參數傳入事件發生時要執行的函式
其實還有第三個參數可以決定是否要把這個監聽放在捕獲階段，傳入 `true` 則只監聽捕獲階段，預設為 `false`

## 什麼是 event delegation，為什麼我們需要它？

以下面的 HTML 當作範例：

```
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li id="list_item">
      <a id="list_item_link" target="_blank" href="http://google.com">
        google.com
      </a>
    </li>
  </ul>
</body>
</html>
```

事件代理，將多個回呼邏輯綁定在同一個上層節點。

- 避免過多重複的監聽器。如果`<ul>`下面有 100 個`<li>`，不可能每個都不可能每個都掛載監聽事件。
- 掛載、移除事件是有成本的（removeEventListener 超級麻煩）。

很合理的反應事件傳遞機制，如果將監聽事件掛載到`<ul>`，每個事件都會傳回來到 target 的上層節點，`<ul>`底下的`<li>`也都一起被監聽到了，之後新增的子節點也同樣有效。

這樣透過父節點來處理子節點的事件，就叫做 event delegation（事件代理）

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

以下面的 HTML 當作範例：

```
<!DOCTYPE html>
<html>
<body>
  <ul id="list">
    <li id="list_item">
      <a id="list_item_link" target="_blank" href="http://google.com">
        google.com
      </a>
    </li>
  </ul>
</body>
</html>
```

- event.preventDefault()
  取消預設行為。
  兩者常常被搞混，但其實 event.preventDefault() 的作用為取消瀏覽器預設行為，我點了 a link，超連結帶我去了別的網頁，就是預設行為。如果我在點擊 a link 加設了 preventDefault()，則此預設行為被取消，不會帶我新開分頁或跳轉。
  舉例：

  ```
  link.addEventListener("click", function (e) {
  e.preventDefault();
  });
  ```

- event.stopPropagation()
  停止事件傳遞。
  阻止 DOM 再往下一個節點繼續補獲或冒泡事件，但如果同一個節點在同一個階段有別的監聽，則還是會被執行，要想連其他監聽都不會被執行的話，可以使用 `stopImmediatePropagation`
  舉例：

  範例一：

  ```
  const list = document.querySelector('#list')
  const listItem = document.querySelector('#list_item')
  const listItemLink = document.querySelector('#list_item_link')
  list.addEventListener("click", (e) => {
    console.log('list capturing')
  }, true)
  listItem.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log('listItem capturing')
  }, true)
  listItem.addEventListener("click", (e) => {
    console.log('listItem capturing2')
  }, true)
  listItemLink.addEventListener("click", (e) => {
    console.log('listItemLink capturing')
  }, true)
  ```

  上述程式碼在點擊 `list-item` 時，會在 console 印出：

  ```
  listItem capturing
  listItem capturing2
  ```

  範例二：

  ```
  const list = document.querySelector('#list')
  const listItem = document.querySelector('#list_item')
  const listItemLink = document.querySelector('#list_item_link')
  list.addEventListener("click", (e) => {
    console.log('list capturing')
  }, true)
  listItem.addEventListener("click", (e) => {
    e.stopImmediatePropagation()
    console.log('listItem capturing')
  }, true)
  listItem.addEventListener("click", (e) => {
    console.log('listItem capturing2')
  }, true)
  listItemLink.addEventListener("click", (e) => {
    console.log('listItemLink capturing')
  }, true)
  ```

  上述程式碼在點擊 `list-item` 時，會在 console 印出：

  ```
  listItem capturing
  ```
