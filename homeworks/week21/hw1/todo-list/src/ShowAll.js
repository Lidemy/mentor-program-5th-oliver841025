import styled from "styled-components";

const ShowAllTodosButton = styled.button`
  padding: 4px;
  color: black;
  margin: 0 5px;

  &:hover {
    color: red;
  }
`;

export default function ShowAll({ handleShowAll }) {
  const handleShowAllClick = () => {
    handleShowAll();
  };

  return (
    <ShowAllTodosButton onClick={handleShowAllClick}>全部</ShowAllTodosButton>
  );
}
