## 前四週心得與解題心得

- 前四週

最大的收穫就是 git \ github 跟 API 的概念了吧，一直對於 git \ github 只會大概使用，卻剛好沒有個目的讓我去使用，怎麼用都蠻彆扭的，剛好趁著交作業形式，熟悉了 push \ pull \ merge \ commit \ 等一切之後工作會使用到的指令，也知道開分支開發新功能的重要，跟自己手動解決了幾個衝突，算是真的很有收穫。

API 也是一個巨大的收穫，課程設計了很多資料庫讓我們去串，以前看文件都不是很懂為什麼要這樣寫，這個 method 要用在哪，只有個模糊印象，臨摹時又發現為什麼每個人寫的又好像不太一樣，這兩週仔細比對瞭解後，才慢慢想起來以前看到的那些 API 相關的文件跟程式碼在做什麼事 ，算是慢慢解開以前的疑惑吧。

課程一直以來都告誡自己千萬不能用**戰術的勤奮掩蓋戰略的懶惰**，也盡量依著 80 / 20 法則在走，**應該少行動，因為我們一行動就不思考**，正因時間太多，竟反而浪費了他，執行一項計畫時，最後百分之二十的時間最具生產力，因此我都是把預計完成的時間減去一半，大部分工作的產能便能倍增，不太會有時間不夠用的問題，至少狀況目前為止看來都還行，但說不定走到後端跟框架那邊，就 GG 了，未知。

前四週學習曲線還不算真的太陡峭，可應付範圍，但也不能說沒有灰心沮喪的時刻，但憑著過往經驗，都能夠順利處理這些喪志的時刻，知道可能是情緒，也只在我的世界裡發生，同樣的問題，在客觀世界中，對其他人來說根本不是問題，宏觀來看，就能冷靜地處理大部分問題，就像幫自己加爆 console.log，檢查哪裡出了問題，再處理，畢竟自己生活出了問題，那這個問題並不是客觀事實，也就是，對我是問題，對別人來說根本不是問題，要做的就是處理我的現象場，就是我的主觀世界，並不是去解決、糾結某個客觀問題。

主觀世界出問題 -> 想辦法解決

這樣思維減少很多不必要情緒負擔，生活有單純一點，非常時期，非常思想，也非常做法。

- HTTP Challenge

一開始真的不太知道 token 要加在哪裡或是怎麼加，只是有個模糊印象，還以為要開 vscode 來寫，後來輾轉在 Google 中查到，就順利解開，不然連入場券都沒得拿 QQ。

中間發現了半島鐵盒連結，就索性邊聽邊寫下去 ...

中間都進展蠻順的，也學到了一些像是 encodeURI(), base64 編碼, User-Agent 等還有 Basic 的基礎加密，延伸看了各種加密方法，了解了原來要網路攻擊、竊取資料有這麼多學問，也補帶看了瀏覽器的歷史。

後來寫道 LV.8 時，寫完歸寫完，但總是覺得應該可以寫更好，正確來說，重複使用性更高，但目前還想不出來，所以就留待日後更有餘裕再回頭寫，將查詢跟修改寫的更簡單、重構性更好。

整體來說，不斷使用、閱讀 API 文件，更熟悉 request 各種 method 的使用時機跟方法，也知道要仔細閱讀 response 的內容來得到想要的資料，雖然寫了一整天，從早到晚，但內心很踏實，學得算蠻踏實的。

- LIOJ 1016, 1017 以及 1018

每寫一題就花費大半天 ＠＠，每一題都要仔細看，不囉唆，直接上 code:

### 1016

（ 此題有參考影片解答做修改 ）

```JavaScript
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', function (line) {
  lines.push(line)
});

// 輸入結束，開始針對 lines 做處理
rl.on('close', function() {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  let totalPlayer = Number(lines[0])
  let aCount = 0
  for(let i=1; i<lines.length; i++) {
    if (lines[i] === 'A') {
      aCount++
    }
  }
  let bCount = totalPlayer - aCount

  if (aCount === bCount || aCount === 0 || bCount === 0) {
    console.log('PEACE')
  } else {
    let whoLose = aCount < bCount ? 'A' : 'B'
    for(let i=1; i<lines.length; i++) {
      if (whoLose === lines[i]) {
        console.log(i)
      }
    }
  }
}
```

邏輯部分跟我想的一樣，只是影片寫法比我簡潔，QQ，學習學習

### 1017

```JavaScript
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
});

var lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on("line", function (line) {
  lines.push(line);
});

// 輸入結束，開始針對 lines 做處理
rl.on("close", function () {
  solve(lines);
});

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const steal = Number(lines[0]);
  const total = Number(lines[1]);
  const arr = [];
  let result = 0;
  if (steal === 0) {
    result = 0;
  } else if (total < steal) {
    for (let i = 2; i < lines.length; i++) {
      result += Number(lines[i]);
    }
  } else {
    for (let i = 2; i < lines.length; i++) {
      arr.push(Number(lines[i]));
    }
    arr.sort((a, b) => b - a); // 降冪排列
    // console.log(arr);
    for (let i = 0; i < steal; i++) {
      result += arr[i];
    }
  }
  console.log(result);
}
//solve([4, 6, 1, 2, 3, 8, 10, 800]);

```

### 1018

```JavaScript
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
});

var lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on("line", function (line) {
  lines.push(line);
});

// 輸入結束，開始針對 lines 做處理
rl.on("close", function () {
  solve(lines);
});

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const levels = Number(lines[0]);
  const ladder = lines[1].split(" ");
  const ladderArr = [];

  for (let i = 0; i < levels; i++) {
    ladderArr.push(Number(ladder[i]));
  }
  let count = 0;
  let max = 1;
  let temp = ladderArr[0];

  for (let i = 0; i < ladderArr.length; i++) {
    if (temp === ladderArr[i]) {
      count++;
    } else {
      if (count > max) {
        max = count;
        temp = ladderArr[i];
        count = 1;
      }
      if (count <= max) {
        temp = ladderArr[i];
        count = 1;
      }
    }
  }
  if (count > max) {
    max = count;
  }
  console.log(max);
}

```
