import styled from "styled-components";

const ShowUnDoneTodosButton = styled.button`
  padding: 4px;
  color: black;
  margin: 0 5px;

  &:hover {
    color: red;
  }
`;

export default function ShowUnDone({ handleShowUnDone }) {
  const handleShowUnDoneClick = () => {
    handleShowUnDone();
  };

  return (
    <ShowUnDoneTodosButton onClick={handleShowUnDoneClick}>
      未完成
    </ShowUnDoneTodosButton>
  );
}
