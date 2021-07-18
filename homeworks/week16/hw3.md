- 編譯階段時會做 hoisting，也就是提升宣告，但賦值不會提升
- 編譯階段會建立 Execution Context（下面簡稱 EC）
- 進入 EC 時會照順序做三件事：
  **找參數 -> 找 function -> 找變數**

  1. 找到傳進目前 function 的參數並放進 Variable Object(以下簡稱 VO)，沒有傳值的話就是 `undefined`

  2. 找到目前 function 裡的 function 宣告放進 VO，如已有同名的，直接覆蓋掉
  3. 找到目前 function 中的變數宣告並放進 VO，如已有同名的，就不做事

原始程式碼：

```js
var a = 1;
function fn() {
  console.log(a); // undefined
  var a = 5;
  console.log(a); // 5
  a++;
  var a;
  fn2();
  console.log(a); // 20
  function fn2() {
    console.log(a); // 6
    a = 20;
    b = 100;
  }
}
fn();
console.log(a); // 1
a = 10;
console.log(a); // 10
console.log(b); // 100
```

輸出：

```
undefined
5
6
20
1
10
100
```

我們可以模擬 JS 引擎跑一次：

編譯階段：

```
global EC
global VO {
    fn: function
    a: undefined
}
```

執行階段：

```
global EC
global VO {
    fn: function
    a: 1
}
```

編譯階段：

```
fn EC
fn AO {
    fn2: function
    a: undefined
}

global EC
global VO {
    fn: function
    a: 1
}
```

執行階段：

```
fn EC
fn AO {
    fn2: function
    (console.log(undefined))
    a: 5
    (console.log(5))
}

global EC
global VO {
    fn: function
    a: 1
}
```

編譯階段：

```
fn2 EC
fn2 AO {
}

fn EC
fn AO {
    fn2: function
    a: 5
}

global EC
global VO {
    fn: function
    a: 1
}
```

執行階段：

```
fn2 EC
fn2 VO {
    (因為這層沒有，就往上一層找，console.log(6))
}

fn EC
fn VO {
    fn2: function
    a: 20
    (console.log(20))
}

global EC
global VO {
    fn: function
    a: 1
    console.log(1)
    b: 100
}
```

fn()內容執行結束，剩下：

編譯階段：

```
global VO {
    a: 1
    b: 100
}
```

執行階段：

```
global VO {
    a: 10
    (console.log(10))
    b: 100
    console.log(100)
}
```

程式結束

### 參考

- [我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)

- [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.huli.tw/2018/12/08/javascript-closure/)
