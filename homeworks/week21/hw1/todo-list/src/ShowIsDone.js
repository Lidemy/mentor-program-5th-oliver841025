import styled from "styled-components";

const ShowIsDoneTodosButton = styled.button`
  padding: 4px;
  color: black;
  margin: 0 5px;

  &:hover {
    color: red;
  }
`;

export default function ShowIsDone({ handleShowIsDone }) {
  const handleShowIsDoneClick = () => {
    handleShowIsDone();
  };

  return (
    <ShowIsDoneTodosButton onClick={handleShowIsDoneClick}>
      已完成
    </ShowIsDoneTodosButton>
  );
}
