import React from 'react';
import AddTodo from './AddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectTodos } from '../selectors';
import DeleteAll from './DeleteAll';
import styled from 'styled-components';

const FunctionBlock = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const App = () => {
  // useSelector((store) => store.todoReducer.todos)
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();
  return (
    <div>
      <FunctionBlock>
        <DeleteAll todos={todos} dispatch={dispatch} />
      </FunctionBlock>
      <AddTodo filter={filter} todos={todos} dispatch={dispatch} />
    </div>
  );
};

export default App;
