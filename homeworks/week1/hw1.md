## 交作業流程

1. 藉由連結，進入 Lidemy 中自己的專屬倉庫

2. 進入倉庫後，複製右上角 code download 中的連結

3. 本地端新建一個資料夾

4. `git init` 這個資料夾

5. `git clone` 剛剛的網址
   ex: `git clone git@github.com:Lidemy/mentor-program-5th-oliver841025.git`

6. 接下來準備在本地端寫作業

7. `git branch week1` ，**開始寫任何東西以前，都要先開分支**

8. `git checkout week1` ，切換到此分支上作業

9. 完成作業並存檔

10. `git add .`

(這之間可以 `git status` ，確認改動或新增了哪些檔案)

11. `git commit -m 'week1 first commit'`

(在 git commit tree 中沒有新檔案情況下，10, 11 可濃縮成 `git commit -am 'week hw'` ，若有新檔案，要先使用 `git add .`)

12. `git push origin week1` ，推上遠端倉庫

13. 去 GitHub 上面發 PR ，確定就 merge 到 master

14. 去 Files changed 檢查有沒有要更改的地方

15. 複製連結，貼上至「繳交作業」
