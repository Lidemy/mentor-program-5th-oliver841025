原始程式碼：

```js
for (var i = 0; i < 5; i++) {
  console.log("i: " + i);
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

輸出：

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

執行步驟：

1. 宣告變數 i，賦值 0，i < 5，進入迴圈
2. `console.log("i: " + i)` ，也就是 `console.log("i: 0")` 被呼叫因此進入 call stack 的最上方
3. 印出 `i: 0`
4. 將 `console.log("i: 0")` 從 call stack 最上方 pop off
5. `setTimeout()` 進入 call stack 最上方，開始計時器，0 秒後，`() => {console.log(i)}` 會被放到 callback queue 中等待執行，`setTimeout()` pop 出 call stack
6. `i++`，`i = 1`，迴圈繼續
7. `console.log("i: " + i)` ，也就是 `console.log("i: 1")` 被呼叫因此進入 call stack 的最上方
8. 印出 `i: 1`
9. 將 `console.log("i: 1")` 從 call stack 最上方 pop off
10. `setTimeout()` 進入 call stack 最上方，開始計時器，1 秒後，`() => {console.log(i)}` 會被放到 callback queue 中等待執行，`setTimeout()` pop 出 call stack
11. `i++`，`i = 2`，迴圈繼續
12. `console.log("i: " + i)` ，也就是 `console.log("i: 2")` 被呼叫因此進入 call stack 的最上方
13. 印出 `i: 2`
14. 將 `console.log("i: 2")` 從 call stack 最上方 pop off
15. `setTimeout()` 進入 call stack 最上方，開始計時器，2 秒後，`() => {console.log(i)}` 會被放到 callback queue 中等待執行，`setTimeout()` pop 出 call stack
16. `i++`，`i = 3`，迴圈繼續
17. `console.log("i: " + i)` ，也就是 `console.log("i: 3")` 被呼叫因此進入 call stack 的最上方
18. 印出 `i: 3`
19. 將 `console.log("i: 3")` 從 call stack 最上方 pop off
20. `setTimeout()` 進入 call stack 最上方，開始計時器，3 秒後，`() => {console.log(i)}` 會被放到 callback queue 中等待執行，`setTimeout()` pop 出 call stack
21. `i++`，`i = 4`，迴圈繼續
22. `console.log("i: " + i)` ，也就是`console.log("i: 4")` 被呼叫因此進入 call stack 的最上方
23. 印出 `i: 4`
24. 將 `console.log("i: 4")` 從 call stack 最上方 pop off
25. `setTimeout()` 進入 call stack 最上方，開始計時器，4 秒後，`() => {console.log(i)}` 會被放到 callback queue 中等待執行，`setTimeout()` pop 出 call stack
26. `i++`，`i = 5`，迴圈結束
27. 將 main() 從 call stack 最上方 pop off
28. call stack 已清空，event loop 將 callback queue 中第一個 callback，`() => {console.log(i)}，此時 `i = 5`，也就是 `() => {console.log(5)}` 放到 call stack 最上方，執行之後發現這個 function 裡面還要呼叫 console.log(5)，所以把 console.log 丟進去 call stack
29. 印出 `5`
30. 將 `console.log(5)` 從 call stack 最上方 pop off
31. call stack 已清空，event loop 將 callback queue 中第一個 callback，`() => {console.log(i)}，此時 `i = 5`，也就是 `() => {console.log(5)}` 放到 call stack 最上方，執行之後發現這個 function 裡面還要呼叫 console.log(5)，所以把 console.log 丟進去 call stack
32. 印出 `5`
33. 將 `console.log(5)` 從 call stack 最上方 pop off
34. call stack 已清空，event loop 將 callback queue 中第一個 callback，`() => {console.log(i)}，此時 `i = 5`，也就是 `() => {console.log(5)}` 放到 call stack 最上方，執行之後發現這個 function 裡面還要呼叫 console.log(5)，所以把 console.log 丟進去 call stack
35. 印出 `5`
36. 將 `console.log(5)` 從 call stack 最上方 pop off
37. call stack 已清空，event loop 將 callback queue 中第一個 callback，`() => {console.log(i)}，此時 `i = 5`，也就是 `() => {console.log(5)}` 放到 call stack 最上方，執行之後發現這個 function 裡面還要呼叫 console.log(5)，所以把 console.log 丟進去 call stack
38. 印出 `5`
39. 將 `console.log(5)` 從 call stack 最上方 pop off
40. call stack 已清空，event loop 將 callback queue 中第一個 callback，`() => {console.log(i)}，此時 `i = 5`，也就是 `() => {console.log(5)}` 放到 call stack 最上方，執行之後發現這個 function 裡面還要呼叫 console.log(5)，所以把 console.log 丟進去 call stack
41. 印出 `5`
42. 將 `console.log(5)` 從 call stack 最上方 pop off

43. call back 與 callback queue 清空，程式執行完畢

原始程式碼：

```js
for (var i = 0; i < 5; i++) {
  console.log("i: " + i);
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

因為 `var` 是 function scope variable，就是以 function 為作用域，因此可以看做：

```js
var i;
for (i = 0; i < 5; i++) {
  console.log("i: " + i);
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

- 當迴圈結束時，i 已經是 5 了，因此最後才會印出 5

- `setTimeout()` 只能保證幾毫秒後**即將會**執行，但不能保證幾毫秒後會**立即**執行，因為他有可能還在 callback queue 中排隊，等待 call stack 清空，才輪得到 callback queue 中的 cb

### 參考

- [Javascript 继承机制的设计思想](https://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)

- [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.huli.tw/2018/12/08/javascript-closure/)
