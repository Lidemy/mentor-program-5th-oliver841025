原始程式碼：

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
console.log(3);
setTimeout(() => {
  console.log(4);
}, 0);
console.log(5);
```

印出順序：

```
1
3
5
2
4
```

1. 全域環境程式（這裡稱作 `main()`）進入 call stack

2. `console.log(1)` 被呼叫因此進入 call stack 的最上方
3. 印出 `1`
4. 將 `console.log(1)` 從 call stack 最上方 pop off
5. `setTimeout()` 進入 call stack 最上方，開始計時器，0ms 後，`console.log(2)` 會被放到 callback queue 中等待執行<>
6. 將 `setTimeout()` 從 call stack 最上方 pop off
7. `console.log(3)` 被呼叫因此進入 call stack 的最上方
8. 印出 `3`
9. 將 `console.log(3)` 從 call stack 最上方 pop off
10. `setTimeout()` 進入 call stack 最上方，開始計時器，0ms 後，`console.log(4)` 會被放到 callback queue 中等待執行
11. `console.log(5)` 被呼叫因此進入 call stack 的最上方
12. 印出 `5`
13. 將 main() 從 call stack 最上方 pop off
14. call stack 已清空，event loop 將 callback queue 中第一個 callback，也就是 `console.log(2)` 放到 call stack 最上方
15. 印出 `2`
16. 將 `console.log(2)` 從 call stack 最上方 pop off
17. call stack 已清空，event loop 將 callback queue 中第一個 callback，也就是 `console.log(4)` 放到 call stack 最上方
18. 印出 `4`
19. 將 `console.log(4)` 從 call stack 最上方 pop off
20. call back 與 callback queue 清空，程式執行完畢

- JavaScript 是單執行緒程式語言，只有一個 call stack，一次也只能執行一件事，JS 中等待執行的任務會被放入 call stack。

  既然是單執行緒語言，究竟要如何達成非同步操作？回到以瀏覽器當作執行環境舉例：

  `setTimeout(cb, 5000)`
  簡單說，就是告訴瀏覽器「 5000 毫秒後幫我呼叫 cb 」，瀏覽器就會開另一個 thread 去計時，不會利用 main thread 做這件事。

  接著瀏覽器某個 thread 計時 5000 毫秒（5 秒）到了，呼叫剛剛的 cb 進入 callback queue 等待執行。

- 如果 call stack 為空，event loop 就會將 callback queue 中的 cb 放入 call stack 中。

### 參考

- [菲利普·罗伯茨：到底什么是 Event Loop 呢？ | 欧洲 JSConf 2014](https://www.youtube.com/watch?v=8aGhZQkoFbQ&list=WL&index=43&t=32s&ab_channel=JSConf)

- [[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式（Learn event loop, stack, queue, and concurrency mode of JavaScript in depth）](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)
