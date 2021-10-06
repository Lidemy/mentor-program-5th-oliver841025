import styled from "styled-components";

const ClearAllTodosButton = styled.button`
  padding: 4px;
  color: black;
  margin: 0 5px;

  &:hover {
    color: red;
  }
`;

export default function DeleteAll({ handleDeleteAll }) {
  const handleDeleteAllClick = () => {
    handleDeleteAll();
  };

  return (
    <ClearAllTodosButton onClick={handleDeleteAllClick}>
      一鍵清空
    </ClearAllTodosButton>
  );
}
