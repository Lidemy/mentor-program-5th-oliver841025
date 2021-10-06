## 為什麼我們需要 Redux？

Redux 專門用於管理狀態。

最主要原因是專案到後期，規模越來越大，每個 component 都有自己的 state，如果有需要共享的 state，傳遞就會非常不便利，state 這樣一層層傳遞，除了沒辦法保持 Stateless Component 的乾淨，也有很多父組件跟子組件間根本不需要這個這個 state，只是為傳遞而已。

那這個不便利最主要是因為如果有兩個 component 需要共用一個 state，那我們就會將這個 state 拉到這兩個 component 的父組件（持有 State 的叫做 Smart Component，以下稱為 Container，它的任務就是將持有的 State 分派給所有的 Stateless Component）中，這樣的操作十分合理，因為保持了子組件的 pure（或是 Stateless Component），維護簡單同時容易測試，但如果專案一大，就像開頭提到的情況，典型的解法就是 Container 再往上移一層，但這樣重構次數一多就會造成維護成本升高。

Redux 就是處理這樣的問題，將所有的 State 存在 Component 堆疊中的最上層 Store，根據各個 Component 的需要切出資料並往下傳遞，這樣一來 Store 以下的 Component 就幾乎都可以做到 Stateless 了。

[為什麼用 Redux？ / Why use Redux?](https://medium.com/@tonypai/%E7%82%BA%E4%BB%80%E9%BA%BC%E7%94%A8-redux-why-use-redux-eaeccfbb2006)
[为何要使用 Redux](https://www.jianshu.com/p/d6614feef303)

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 讓開發者可以在 JavaScript 應用程式建立一個而且唯一的資料管理容器，用來集中式的管理資料，這個資料管理容器又稱為 Store (倉庫)，主要由 State、Action、Reducer 組成。

#### 三大元件：

- action: 描述發生的事件類別(type)，以及所承載的資訊(payload)
- reducer: 一個函式，負責將給定的 state 根據給定的 action 做變化而得到新的 state，**一個專案可以有多個 reducer**
- store: 整個 Redux 運作的核心，負責儲存整個 state tree，**每個專案只會有一個 store**

#### 三大原則：

- 唯一資訊來源：整個專案的 state，被儲存在一個樹狀物件放在唯一的 store 裡面
- State 是唯讀的：改變 state 的唯一的方式是發出一個 action，也就是一個描述發生什麼事的物件（Redux 為了讓事情單純，且可以回溯狀態，所以嚴格規定 reducer 是不能有副作用的 pure function，以確保給定相同的 state 和 action 會永遠得到相同的新 state）
- 變更被寫成 pure function：要指定 state tree 如何藉由 action 來轉變，你必須撰寫 pure reducer

Redux 架構圍繞著嚴格的單向資料流
要改變 state 就要 dispatch 一個 action，action 到 reducer 之後會產生新的 state，才可以改變 state。

[Redux 簡介(上) — 使用 Redux 實作存錢筒功能](https://max80713.medium.com/redux-%E7%B0%A1%E4%BB%8B-%E4%B8%8A-%E4%BD%BF%E7%94%A8-redux-%E5%AF%A6%E4%BD%9C%E5%AD%98%E9%8C%A2%E7%AD%92%E5%8A%9F%E8%83%BD-dd761d8a62e8)
[Redux 把 Store 轉換成 Props 傳遞的作用](https://note.pcwu.net/2017/03/06/redux-state-to-props/)

## 該怎麼把 React 跟 Redux 串起來？

使用 react-redux 套件，在需要共用 state 的 component 的父層，用 `<Provider store={store}>`包住，裡面的 component 便可以用 `useSelector()` 來取得 state，用`useDispatch()` 來傳送 action。
