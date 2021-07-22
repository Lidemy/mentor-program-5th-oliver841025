原始程式碼：

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;
obj.inner.hello(); // ??
obj2.hello(); // ??
hello(); // ??
```

可以轉化成（主要是下面不一樣）：

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;
obj.inner.hello().call(obj.inner); // ??
obj2.hello().call(obj2) => obj.inner.hello.call(obj.inner); // ??
hello().call(undefined); // ??
```

輸出：

```
2
2
undefined
```

- 脫離了物件導向的 `this` 就沒什麼意義，因為也沒有 instance 可以指向，換句話說，物件導向下的 `this` 就是 instance 本身

- 脫離物件導向，沒什麼意義的情況下，因為是一般模式，想知道 `this`，會輸出 `undefined`，如果是嚴格模式 (`use strict`)，在瀏覽器上就會是 `window`，在 node.js 上會是 `global`

- `this` 只跟你在哪裡呼叫有關，跟你的程式碼位置、作用域都無關

- call() 傳入的任何參數都可以被當作 `this` 輸出，利用這一點，我們可以使用一點技巧幫我們知道目前的 `this` 的值是什麼：

  ex :

  ```
  obj.inner.hello() -> obj.inner.hello().call(obj.inner)
  ```

  所以 `this` 的值就是 `obj.inner`，`this.value` 就是 `obj.inner.value`，印出 `2`

### 參考

- [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)

- [該來理解 JavaScript 的原型鍊了](https://github.com/aszx87410/blog/issues/18)

- [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)
