## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState: 用來設定 component 的 state

```jsx
const [state, setState] = useState(initialState);
setState(newState);
```

- 回傳一個 state 值，以及更新 state，state 改變時會重新 render component
- 第一次 render 時，回傳的 state 值會和 initialState 參數相同
- 可透過 setState 來更新 state，state 一旦改變，就會觸發 React 去重新渲染畫面

### useEffect: 用來告訴 React component 在 render 之後要做的事

```jsx
const [value, setValue] = useState(null);
useEffect(() => {
  if (value) {
    // do something...
  }
}, []);
```

- 第一個參數：useEffect 接受一個 function 當第一個參數（稱為 effect），這個 effect 會在瀏覽器 render 完成，layout 完成後執行。

```jsx
const [value, setValue] = useState(null);
useEffect(() => {
  if (value) {
    // do something...
  }
}, [value]);
```

- 第二個參數：
  - 如果是傳空陣列的情況：
    這裡帶空陣列表示只會在 component 載入時才執行裡面邏輯，空陣列傳的參數表示裡面邏輯會因為參數 state 變動重新執行裡面邏輯，這裡沒傳表示載入後不會再做任何更新。
  - 如果是傳參數進去陣列：
    這裡 useEffect 裡面做的事會因為 value 數據更新而重新執行裡面邏輯。

### useContext: 解決跨多層傳遞資料的問題，就像建立了全域變數

component 傳遞資料時通常使用 props 向下傳，但傳遞的過程，有些 component 根本不需要這些 props，只是幫忙傳遞而已，如此不只很麻煩還容易出問題，這時候就可以使用 `useContext`。

```jsx
import {createContext} from 'react;
const MyContext = createContext();
```

傳一個預設值給 `createContext()`，`createContext()`會回傳一個 context object。

```jsx
<MyContext.Provider value={myValue}>
```

```jsx
const { value } = useContext(MyContext);
```

`useContext()` 會接收一個 context object 並回傳該 context 目前的值。Context 的值是取決於距離上層 component 最近的 <MyContext.Provider> 的值。
當 <MyContext.Provider> 更新時，會重新 render。

### useReducer

### useCallback

### useMemo

### useRef

### useImperativeHandle

### useLayoutEffect

### useDebugValue

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

## 請問 class component 與 function component 的差別是什麼？

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
