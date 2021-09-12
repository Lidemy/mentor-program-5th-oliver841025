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

### useReducer: 是 useState 的替代方案，當 state 邏輯變得複雜，需要操作多種 state 時可使用

```jsx
const [state, dispatch] = useReducer(reducer, initState);
```

- state: 當前的 state 值
- dispatch: 透過參數來跟 function 溝通，藉此處理控制方式
- reducer: 用來接收一個 (state, action) => newState，並回傳當前的 state 和對應的 dispatch 方法
- initState: 設定 state 的初始值

### useCallback: 用來記憶父元件的記憶體位置，避免在重新渲染時被重新分配

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- 第一個參數是 function，第二個參數是其依賴陣列，會回傳一個 memoized 的 callback
- 在重新渲染時，只會在 dependencies 改變時才更新，防止不必要的渲染，減少效能上的消耗

### useMemo: 用途是當 component 重新渲染時，能避免複雜的程式被重複執行

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 第一個參數傳入要記住的運算函式，第二個參數傳入 dependency array

useMemo 主要應用在元件內如果有個複雜運算函式，為避免在每次 re-render 都重新運算，就可以使用 useMemo 來記住這個函式的運算結果，並在下一次 re-render 階段透過判斷 dependency array 是否有變化來判斷是否重新運算函式，如果 dependency array 不變就回傳上一次的運算結果。

### useRef: 用來抓取 DOM 節點，存放的值不會受到 render 影響

```jsx
const refContainer = useRef(initialValue);

console.log(refContainer.current);
// initialValue
```

- 會回傳一個 mutable 的 ref object，其 .current 屬性會被初始為傳入的參數 initialValue
- .current 屬性變動時，不會觸發 re-render，而每次 render 時都會給同一個 ref object

### useImperativeHandle: 可以在父層調用子層中 ref，選取指定的 DOM 節點

```jsx
useImperativeHandle(ref, createHandle, [deps]);
```

- 第一個參數是接收的 ref
- 第二個參數是傳給父層的方法

透過 useImperativeHandle hook 在使用 ref 屬性時可以向父 component 暴露自定義的 instance 的值

### useLayoutEffect

功能與 useEffect 相似，差別在於 useLayoutEffect 會在 render 完成，layout 完成之前執行

### useDebugValue

```jsx
useDebugValue(value);
```

可用來在 React DevTools 中顯示自訂義 hook 的標籤

參考資料:
[參考資料](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)
[參考資料](https://reactjs.org/docs/hooks-reference.html#usereducer)
[參考資料](https://medium.com/ichef/%E4%BB%80%E9%BA%BC%E6%99%82%E5%80%99%E8%A9%B2%E4%BD%BF%E7%94%A8-usememo-%E8%B7%9F-usecallback-a3c1cd0eb520)
[[筆記] React.memo / useMemo / useCallback](https://xiaoming.coderbridge.io/2021/02/17/%E7%AD%86%E8%A8%98-reactmemo---usecallback---usememo/)
[[React] 理解以 useRef / useState 產生變數的適用情境](https://dotblogs.com.tw/wasichris/2020/03/26/181546)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

建議邊看[此圖](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)邊閱讀

### Mounting

component 被放到 DOM 時，觸發順序如下

- constructor()
  es6 的 class 語法糖，初始化並建構物件，可以用來綁定 method，發生在 component 被放到 DOM 之前。
  ```jsx
  constructor(props) {
  	super(props);
  	// 不要在這裡調用 this.setState()
  	this.state = { counter: 0 };
  	this.handleClick = this.handleClick.bind(this);
  }
  ```
- getDerivedStateFromProps()
  發生在 Mounting 和 Updating 的 render() 之前，用來更新 state。

- render()
  render 函式負責將 return statement 後的 JSX 渲染到頁面上，調用 setState 函式或是更新父元件傳下去的 props 都會造成 re-render，這邊的 re-render 其實就是再跑一次 render function。

- componentDidMount()
  component 被放到 DOM 之後立刻調用，也算是 render 以外，使用最多的生命週期，如 ajaxAPI 或綁定 DOM 事件都會在這個函式中執行。
  ```jsx
  componentDidMount() {
    // 模擬 ajax 請求
    fetch('some url')
        .then((res) => res.json())
        .then((data) => console.log(data))
  }
  ```

### Updating

當 component 的 props 或 state 更新，重新渲染（re-rendered） DOM 時會觸發，觸發順序如下

- getDerivedStateFromProps()
  發生在執行 render 之前，根據回傳的值來判斷 state 或 props 是否發生變化，當有發生變化則回傳 true。如果回傳 false 則不會調用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。

- shouldComponentUpdate()

- render()

- getSnapshotBeforeUpdate()(少用到)
  發生在最新的一次 render 之前，可以在 component 發生改變之前從 DOM 裡面取得資料，回傳的資料會傳給 componentDidUpdate()。

- componentDidUpdate()

  ```jsx
  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
        updateUser(this.props.id);
    }
  }
  ```

  顧名思義就是在狀態更新且重新渲染後被觸發的函式。在這可以處理 call api 動作，或是 setState，促使重新 update ，但提醒記得要判斷執行時機，否則會進入無限迴圈。

### Unmounting

- componentWillUnmount

  發生在 component 從 DOM 之上移除之前。可以做清除綁定 eventListener，或清除 cookie、local storage 等機制，另外需要注意的事，在這裏執行 setState 是不會觸發 re-render 的。

參考資料：
[Component Lifecycle](https://ithelp.ithome.com.tw/articles/10215101)

## 請問 class component 與 function component 的差別是什麼？

### class component

```jsx
class App extends Component {
  state = {
    count: 0,
  };
  handleCountChange = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      //...
      <Counter count={this.state.count} setCount={this.handleCountChange} />
    );
  }
}
```

- 需繼承 React.Component
- 需要實作 render 方法
- 擁有 this
- 每次都可以拿到最新的 this.props，因為 this 隨時都在變化
- 即使狀態沒變化，只要調用了 setState function 就會觸發 component 的重新渲染。也就是說即使值沒有改變，但調用了 setState 就會迫使元件重新渲染。

### function component

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  return (
    //...
    <Counter count={count} setCount={setCount} />
  );
};
```

- 可以用 arrow function 宣告或是一般的 function
- 沒有 this
- props 會一直是原本傳進來的那個，而不會跟著更新，閉包的概念
- 對 function component 來說，只有狀態值真正改變時，才會觸發 render 函式的調用。因此某些狀況下 functional component 自動幫你擋掉了一些不必要的重新渲染，提升整體效能。

class-based component 要使用 state 必須定義一個 state 物件，而要修改 state 必須透過 setState 這個內建函式，相比 hooks 是一個 state 定義一個變數與一個涵式，hooks 的方式方便管理許多。

參考資料：
[【Day 8】Class component && Functional component](https://ithelp.ithome.com.tw/articles/10214751)
[React Functional Component 與 Class Component 的差異](https://medium.com/coding-hot-pot/react-functional-component-v-s-class-component-e46c6dc5a319)

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

簡單說兩者的差異在於 Component 的資料是否被 React 控制。

Controlled Component 的資料由 React 控制，React 的世界裡，表單的狀態和值的更新是由開發者處理，表單欄位的值可從 props 或 state 取得。

Uncontrolled Component 的資料由 DOM 控制，表單的狀態是由元件本身來做儲存和更新的。

Component 的資料是否被 React 控制是指 DOM element 資料是否由來自於 Component 的 state，即 DOM element 的資料與 Component 的 state 是否一致。

參考資料：
[React Form: Redux Form vs React Final Form vs Formik and Yup](https://blog.techbridge.cc/2019/05/03/react-form/)
