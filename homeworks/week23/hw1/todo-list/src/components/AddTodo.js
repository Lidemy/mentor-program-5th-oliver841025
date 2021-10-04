import React, { useState } from 'react';
import styled from 'styled-components';
import { addTodo, deleteTodo, setFilter, toggleTodo } from '../actions';

const TodoItem = styled.li`
  ${(props) => props.$isDone && `text-decoration: line-through`}
`;

const FunctionBlock = styled.div`
  display: flex;
  margin-top: 10px;
`;

const AddTodo = ({ todos, dispatch, filter }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      ></input>
      <button
        onClick={() => {
          dispatch(addTodo(value));
          setValue('');
        }}
      >
        add todo
      </button>
      <FunctionBlock>
        <button
          onClick={() => {
            dispatch(setFilter('all'));
          }}
        >
          全部
        </button>
        <button
          onClick={() => {
            dispatch(setFilter('isDone'));
          }}
        >
          已完成
        </button>
        <button
          onClick={() => {
            dispatch(setFilter('unDone'));
          }}
        >
          未完成
        </button>
      </FunctionBlock>
      <ul>
        {todos
          .filter((todo) => {
            if (filter.name === 'all') {
              return todo;
            }
            if (filter.name === 'isDone') {
              return todo.isDone;
            }
            if (filter.name === 'unDone') {
              return !todo.isDone;
            }
            return todo;
          })
          .map((todo) => (
            <TodoItem key={todo.id} $isDone={todo.isDone}>
              {todo.name}
              <button
                onClick={() => {
                  dispatch(toggleTodo(todo.id));
                }}
              >
                {todo.isDone ? '已完成' : '未完成'}
              </button>
              <button
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
              >
                刪除
              </button>
            </TodoItem>
          ))}
      </ul>
    </div>
  );
};

export default AddTodo;
