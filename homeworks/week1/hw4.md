## 跟你朋友介紹 Git

#### Git 是什麼以及基礎概念

首先先了解「 版本控制 」是什麼

印象中，一定有因為一份檔案做了多次修改，但可能每一版你都想保存下來，因此會給他們不同命名，這時候，你就是在做「 版本控制 」這件事。

再來講 Git

Git 就是在幫你做這件事，只是做得很細很清楚，減少因人工手動出錯的問題。

#### 開始使用 Git

先去 git 官網下載 git ，就可以打開 command line 開始使用，打開 command line 後先切換到要版本控制的資料夾 `cd <資料夾路徑>`

#### git init

初始化 git ，把 git 加進要做版本控制的資料夾，指令是 `git init`

補： `git init` 時會把整個檔案都記起來，之後有更動， git 都是記住修改的部分

#### git add

這時候才是真正的版本控制，上一步 `git init` 是讓這個資料夾可以開始使用 git ， 接下來使用 `git add <要加入版本控制的檔案>`，也可以使用 `git add .` 將資料夾中所有檔案都加入版本控制

#### git commit

目前已經可以做版本控制了，但菜哥之後想升級他的笑話，改完後可以使用 `git commit -m 'joke'` 把這個改完的部分 commit ，也就是將這個最新版本加入版本控制中，以 GUI 來說就像是再開一個新資料夾，然後把最新的檔案放入這個資料夾，因此最新版笑話就是這個 joke 版本，指令中的 `-m` ， m 就是 message， 'joke' 部分可以自己設定 commit message ，通常會設定這次改動目的的訊息，讓你好辨識版本就好

補充：

- `git commit -am 'joke'` 代表一次進行 `git add` + `git commit -m 'joke'` 的動作，不過僅限定已有檔案的情況使用，如果是已經 add 過的檔案，還是得分開步驟進行

#### git status

查看檔案的 git 狀態使用 `git status` ，可以查看資料夾中尚未加入版本控制或是加入了但還沒提交 (commit) 的檔案，輸入指令後可能會看到以下訊息

`On branch master No commits yet Untracked files: (use "git add <file>..." to include in what will be committed) joke.txt nothing added to commit but untracked files present (use "git add" to track)`

中間的 `untracked files :` 代表有一個笑話 joke.txt 還沒被追蹤到，翻譯就是還沒加入版本控制，這時使用 `git add .` 把他加入就行

`On branch master No commits yet Changes to be committed: (use "git rm --cached <file>..." to unstage) new file: joke.txt`

提示檔案已加入版本控制，可以使用 `git commit -m '訊息'` 新增新版本

commit 後再使用 `git status` 就看不到已經 commit 的檔案

補充：無論何時，都能使用 `git status` 來確認有沒有不在自己掌控內的檔案

#### git log

如果想知道自己究竟提交了幾個版本，可以使用 `git log` ，可以看到這個檔案修改的歷史紀錄

其中看到的一長串亂數，屬於這個版本專屬的版本號，提交後才有。

補充：想看較簡短資訊可輸入 `git log --oneline` ，只會有簡短的版本號跟 commit message

#### git checkout

如果今天你想切去看其他版本，可以使用 `git checkout <版本號>`，版本號可以在 `git log` 時複製，看完想再切回最新版本就輸入 `git checkout master` ， master 都預計是最新版本

#### 將檔案放到遠端 GitHub

菜哥後來想將自己的笑話史放上網路管理，這樣用其他電腦也可以做編輯，這時就有個遠端倉庫叫做 GitHub ，可以存放你的 repository ，就像我們會丟檔案到雲端，也可以把檔案丟到 GitHub ，還可以做版本控制

補充：笑話加入資料夾後，這個資料夾就算是一個儲存庫，也就是 repository

#### git remote add

至於如何丟上 GitHub

- 先到 GitHub 創立一個新的 repository ，當作放笑話紀錄的地方
- 回到 command line ，使用 `git remote add origin <https://github.com/你的 repository 名稱>`

補充： `add` 就是將後面 repo 的網址加入本地 (local) ，`origin` 是一個代號代表後面的 repo 網址，也可以改成其他名稱，預設會是 origin

#### git branch

檔案剛加入 git 時都只會有一個預設 branch (分支)，可能在多人協作或自己想要添加什麼新功能，但做完還是會覺得不要好了，想回到原本檔案狀態，這時候就適合開一個新的 branch ，同時會建立一個新指標指向這個版本，然後在下次 commit 建立快照時同時移動這個指標，在分支 (branch) 做的改動是不會影響到 master 這個 branch 的

#### git push

在 `git add .` 後，接著是 `git push origin <分支>`，將本地的資料夾推上遠端的分支

#### git pull

假設遠端 GitHub 的倉庫內容有更動，現在又想要在本地電腦繼續做編輯，可是因為在遠端倉庫的修改，本地電腦檔案並不會跟著修改，因此我們需要手動 pull 這個檔案下來本地，這時使用 `git pull origin <分支>` ，這樣子就能繼續對最新的版本做編輯

補充：本地端與遠端的 master 應該是要隨時保持同步的

#### git branch -d

在成功將本地端檔案推上遠端後，也順利 merge 進 master 後，本地切回 master `git checkout master`，就可以刪除本地的 branch 了，使用 `git branch -d <分支名>`
