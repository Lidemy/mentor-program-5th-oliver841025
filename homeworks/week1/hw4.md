## 跟你朋友介紹 Git

Git 是什麼以及基礎概念

首先先了解「 版本控制 」是什麼

印象中，一定有因為一份檔案做了多次修改，但可能每一版你都想保存下來，因此會給他們不同命名，這時候，你就是在做「 版本控制 」這件事。

接著談 Git

時間拉長，你發現檔案愈來越多，命名多到自己也越來越不能回憶每個檔案內容是什麼，你很苦惱，這時候 Git 就是幫忙你能夠有效的做版本控制，命名、建立時間以至於記錄每個版本的差異，都一目了然。

時間更長，你在工作上的夥伴也更多，這時候面臨到一個問題，大家都想對同樣的檔案做修改，可是每個人速度不同，完成度跟開發方向也都完全不同，總不能發布一個登入系統完善，但頁面跳轉 bug 很多的產品，你無法再像一個人工作一樣，一切又混亂起來...

這時候你想到 Git 。

這時大家都**先複製同一個檔案到自己電腦當作起始點** (註 1)，這邊我們叫它 本地 master / 公司 master ，接著分配工作，假設 A 處理使用者登入功能， B 處理網頁跳轉問題修復， C 處理提取資料效能問題，分配好後，大家各自努力。

A 處理使用者登入功能，在擁有 本地 master 後，如火如荼開始，可是他又想到一個問題，如果他自己在 本地 master 上開發到第 10 版登入功能後，發現還是最想要第 1 版，中間也沒上傳回公司，雖然 Git 是蠻方便可以查到所有過去版本，然後倒回，但實在是太沒有效率了，畢竟他中間所有 8 ～ 9 版就白費了...

於是他想到，在自己電腦開發前他可以**先另外複製一份 本地 master** (註 2)，這邊我們叫它 本地 branch v1 ，然後再在上面開發第 1 版的登入功能。

開發完成也十分滿意，也想把他完成的部分先分享給其他夥伴，於是他就**先把這個 本地 branch v1 上傳回公司** (註 345)，這時就會有 遠端 branch v1 ，但目前 本地 branch v1 內容跟 遠端 branch v1 是一樣的。

這時候從公司方向來看大致會有兩種情況：

1. 爛爆了
   這個 A 寫的完全不能用，不給過！我得拒絕 遠端 branch v1 污染 公司 master

2. 蠻不錯的
   這個 A 蠻厲害的，寫得很好，功能完善，**那就先讓 遠端 branch v1 成為 公司 master 的一部份吧** (註 6)

這邊我們假設是後者，所以 遠端 branch v1 被加入了 公司 master ，皆大歡喜，同事也能自由下載 / 更新自己電腦的檔案，但專案還在繼續...

過了幾天， A 努力不懈的開發出 「登入就抽獎功能」，持續在 本地 branch v1 開發，做好後一樣要上傳回公司，於是加了點註解，註明最主要哪裡不一樣。

可能有疑問說，為什麼 A 不把之前開發好的 本地 branch v1 加入回 本地 master ？

因為存在 公司 master ，而且是已經確定沒問題的，如果在開發 「登入就抽獎功能」 出了差錯，還**可以直接從 公司 master 複製下來檔案，重新開發 「登入就抽獎功能」** (註 7)。

最後大家都順利開發完自己的部分，也都陸續上傳到 公司 master ，這時，公司就可以放心的對外發布這個最終版本，也實現大家一起開發的願景，世界和平。

(註 1) clone

- `git clone https://~`
- 基本上，開發專案的第一步就是先 clone / download 檔案到本地

(註 2) branch

- `git branch name`
- 開發任何功能前，先 branch

(註 3) add .

- `git add .`
- 先將檔案存到 stage 裡面，有點像一個暫時存儲區

(註 4) commit

- `commit -m '你想打的訊息'`
- 將存儲在 stage 的所有檔案提交到 repository ， 後面訊息通常會打這次改動的要點

(註 5) push

- `git push origin branch 名稱`
- 提交到 GitHub

(註 6) pull request

- 回到 GitHub ，所謂發 PR ，要從這邊同意 pull request ，本地檔案才能上傳到 GitHub 分支，接著公司會決定要不要 merge 你的分支進入 公司 master

(註 7) pull

- 當你發現 GitHub 上檔案有變更，而且跟你的本地檔案不一樣，就可以 pull 下來，準備從 pull 下來的檔案繼續做