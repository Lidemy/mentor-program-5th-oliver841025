import React from 'react';
import styled from 'styled-components';
import { deleteAll } from '../actions';

const Button = styled.button`
  color: white;
  background-color: red;
  border: none;
  padding: 10px 20px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const DeleteAll = ({ dispatch }) => {
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(deleteAll());
        }}
      >
        刪除全部
      </Button>
    </div>
  );
};

export default DeleteAll;
