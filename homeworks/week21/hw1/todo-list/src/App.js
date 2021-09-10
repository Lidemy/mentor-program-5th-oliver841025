import { useState, useRef } from "react";
import styled from "styled-components";
import "./index.css";
import TodoItem from "./TodoItem";
import DeleteAll from "./DeleteAll";
import ShowAll from "./ShowAll";
import ShowIsDone from "./ShowIsDone";
import ShowUnDone from "./ShowUnDone";

const TodosContainer = styled.div`
  margin: 100px auto;
  width: 800px;
`;

const TodoInput = styled.input`
  width: 700px;
  padding: 0 10px;
`;

const AddTodoBlock = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

const FunctionalButtonsBlock = styled.div`
  display: flex;
  padding: 10px 0;
`;

function App() {
  const id = useRef(3);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: "吃早餐",
      isDone: true,
    },
    {
      id: 2,
      content: "運動",
      isDone: false,
    },
  ]);

  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value,
      },
      ...todos,
    ]);
    id.current++;
    setValue("");
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      })
    );
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleShowAll = () => {
    setFilter("all");
  };

  const handleShowIsDone = () => {
    setFilter("isDone");
  };

  const handleShowUnDone = () => {
    setFilter("unDone");
  };

  return (
    <TodosContainer className="App">
      <AddTodoBlock>
        <TodoInput
          type="text"
          placeholder="What's Next?"
          value={value}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Add todo</button>
      </AddTodoBlock>
      <FunctionalButtonsBlock>
        <DeleteAll handleDeleteAll={handleDeleteAll}>一鍵清空</DeleteAll>
        <ShowAll handleShowAll={handleShowAll}></ShowAll>
        <ShowIsDone handleShowIsDone={handleShowIsDone}></ShowIsDone>
        <ShowUnDone handleShowUnDone={handleShowUnDone}></ShowUnDone>
      </FunctionalButtonsBlock>
      {todos
        .filter((todo) => {
          if (filter === "all") return todo;
          if (filter === "isDone") return todo.isDone;
          return !todo.isDone;
        })
        .map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleIsDone={handleToggleIsDone}
            ></TodoItem>
          );
        })}
    </TodosContainer>
  );
}

export default App;
