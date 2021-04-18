## 教你朋友 CLI

人想操縱電腦主要有兩種形式，一種是 GUI ，另外一種就是 CLI。

先從 GUI 說起， Graphical User Interface ，照字面翻譯，是我們一直以來常使用的「圖像化使用者介面」，意即你使用滑鼠、鍵盤等雙擊、移動、創建、刪除、開關機、瀏覽網頁、把資料夾或檔案拖來拖去等一切圖像動作，都是屬於這範圍。

再來是你想問的 CLI ， Command Line Interface ，文字指令介面，意即透過文字操縱視窗輸入文字指令，對電腦做你想做的動作。

這邊舉兩個常見例子：

1. 創建資料夾

   - GUI :

     - 停留在想要創建的地方
     - 右鍵創建資料夾
     - 命名

   - CLI :

     - `cd ~/Desktop` (這邊以在桌面創建為例, cd = Change Directory )

     * `cd Desktop` 你已經在使用者 home 資料夾中
     * `cd ~/Desktop` 人在其他資料夾

     - `mkdir <想建立的資料夾名稱>` (創建資料夾且命名, mkdir = MaKe DIRectory )

2. 刪除資料夾

   - GUI :

     - 停留在想要刪除資料夾的上層
     - 右鍵刪除資料夾

   - CLI :

     - `cd ~/Desktop` (這邊以刪除在桌面的資料夾為例, cd = Change Directory )

     * `cd Desktop` 你已經在使用者 home 資料夾中
     * `cd ~/Desktop` 人在其他資料夾

     - `rmdir <想刪除的資料夾名稱>` (刪除資料夾, rmdir = ReMove DIRectory )

實際操作：

使用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案

1. `cd ~/Desktop` (切換至桌面，這邊一樣假設在桌面創建)
2. `mkdir wifi` （創建 wifi 資料夾）
3. `cd wifi` （切換至 wifi 資料夾中）
4. `touch afu.js` （創建 afu.js 檔案）
5. 在這些步驟間，可隨時使用 `pwd` 檢查目前所在資料夾，檔案建立完成使用 `ls` 檢查檔案是否建立成功
