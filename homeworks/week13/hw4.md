## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是一個可以幫我們「模組化」與「打包」的工具，透過「模組化」的方式，方便組織與管理，再透過 Webpack 解析，將這些小模組組合起來，「打包」成一個檔案。

也因為瀏覽器不支援 JavaScript 的 modules，所以我們透過 webpack 把寫好的 JavaScript 模組打包好，變成瀏覽器可以看懂的樣子，其中有很多套件可以設定

ex, 可以把程式碼壓縮、相容不同瀏覽器版本等，也有預處理器的相關套件，可以撰寫 SCSS 檔並自動處理成 CSS 檔案。

**（不支援的東西，寫工具自己支援就好了）**

 而 Webpack 好用的地方在於說，將模組概念從 JavaScript 向外延伸，不論是 CSS, SASS, 圖片皆可視為一個資源模組，可以透過不同的 loader 把各種資源載入到 Webpack 打包成一個 JavaScript 檔案。

簡易流程： index.js, utils.js → 經過 webpack 打包 → main.js

較適合用在大型或複雜的專案，因為會需要管理眾多不同類型的檔案，使用起來相對有感，如果專案內容相對簡單，也不需要程式壓縮處理、相容各個瀏覽器版本，那其實可以不使用 Webpack 的。

##使用方法：

### 1. 在專案資料夾內安裝 webpack：

```
mkdir webpack-demo // 建立專案資料夾
cd webpack-demo // 切換目錄到專案資料夾
npm init -y // npm 初始化，建立 package.json
npm install webpack webpack-cli --save-dev // 安裝 webpack
```

通常開發者會把原始的檔案放在 src 資料夾，編譯過後的檔案放在 dist 資料夾，以方便管理。

### 2. 執行 webpack 就可以進行編譯，預設會把 src 裡的檔案打包到 dist 內成名為 main.js 的檔案:

```
webpack
```

也可以在根目錄建立設定檔 webpack.config.js 來自定義路徑和要打包的模式，以下說明：
使用 webpack 的時候必須提供一個 webpack.config.js 的檔案，裡面寫好他的配置。

`webpack.config.js`

```JavaScript
const path = require('path'); // Node.js 提供快速獲得當前專案路徑的函式庫
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 預設是 production(壓縮代碼)， development 指定為開發環境(未壓縮代碼)
  entry: './src/index.js', // 把別的模組引用進來，程式的入口點
  output: { // 設定打包後的 JS 檔要叫什麼名字以及要擺在哪邊
    filename: 'main.js', // 輸出的檔案
    path: path.resolve(__dirname, 'dist'), //路徑
    library: 'commentPlugin',
  },
  devtool: 'inline-source-map', // 打包後的程式碼對應到原本的程式碼，方便debug
  devServer: {
    contentBase: './dist',
  },
  devServer:{ // 自動偵測檔案改變，自動重新compile與載入
  contentBase: './dist'
  }
  module: { // 配置選項決定如何處理不同類型的模組
    rules: [
      {
        test: /\.css$/i, // 找符合 Regex (正規表達式) 副檔名的模組，對所有css結尾的檔案套用下方的loader載入，載入後webpack就知道怎麼解析檔案
        use: ['style-loader', 'css-loader'], // 定義需加載的 loader，可接受字串陣列或物件陣列傳遞
      },
      {
      test: /\.m?js$/, // 找符合 Regex (正規表達式) 副檔名的模組，對所有js結尾的檔案套用下方的loader載入，載入後webpack就知道怎麼解析檔案
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
    ],
  },
  plugins: [new HtmlWebpackPlugin()], // 把動態產生的資料生成到網頁上
};

```

### 3. 可以在 package.json 建立 script：

```JavaScript
"scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 4. 建立完 script 之後，輸入 npm run build 就可以執行 webpack 了：

```
npm run build
```

**補充：**而 Webpack 本身也只能處理 JavaScript 模組，如果要處理其他文件，就必須使用相關的 Loader，可將 Loader 理解為資源與模組之間的轉換器。他本身是一個 function，接受原文件做為參數傳遞，最後返回轉換後的結果，Webpack 會強大也是因為內部有非常多的 loader 可以使用。

## gulp 跟 webpack 有什麼不一樣？

gulp: **重點是任務和流程管理，類似 task manager**，它的 task 可以有很多種，而不只侷限於 babel, sass, uglify js 等，寫得出來基本上都做得到，自由度較高，但沒有像 webpack 打包的功能

webpack: **最主要的目的就是讓瀏覽器能夠支援 module**，只是在透過各種 loaders 載入資源給 webpack 打包時，可以進行 babel, sass 轉 css 之類的功能，所以才會覺得 gulp 和 webpack 很混淆。

簡單說，gulp 能作各種 tasks 但做不到打包，webpack 能將各種資源打包，但做不到很多 gulp 才能做的 tasks。

## CSS Selector 權重的計算方式為何？

排序越前面權重越重：

1. !important
2. inline style (html 文件中定義的 style)
3. ID 選擇器
4. class 和偽類選擇器(:hover,:focus)、attribute（屬性選擇器）
5. 元素和偽元素(:before 與 :after)
6. 標籤
7. \*(全站預設值)

**補充：**

- 元素：div, p, ul, ol, li, em, header, footer, article....
- 偽類元素：:nth-child() 、 :link 、 :hover 、 :focus 、 :only-of-type 、 :nth-of-type
- attribute（屬性選擇器）:[type:checkbox]、[attr]
