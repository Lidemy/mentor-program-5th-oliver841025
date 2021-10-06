import styled from "styled-components";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;

const TodoContent = styled.div`
  color: green;

  ${(props) => props.$isDone && `text-decoration: line-through;`}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;
  margin: 0 5px 0 0;
  &:hover {
    color: green;
  }
`;

const RedButton = styled.button`
  color: red;
  padding: 4px;
`;

export default function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  return (
    <TodoItemWrapper className="TodoItemWrapper" data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
