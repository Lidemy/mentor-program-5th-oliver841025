import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 50px 100px 50px;
`;

export const Body = styled.body`
  background: #eee;
`;

export const Wrapper = styled.div`
  margin: 30px;
  background: white;
  padding: 20px 280px 30px 40px;
  border-top: rgb(250, 212, 18) solid 15px;
`;
export const Title = styled.h1``;

export const TitleDesc = styled.div`
  margin-top: 30px;
`;

export const Div = styled.div`
  margin-top: 25px;
  color: #e74149;
  font-size: 16px;
  font-weight: 400;

  & + & {
    margin-top: 50px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: #999999;
  font-size: 13px;
  padding: 18px 0;
  margin-top: 70px;
`;

export const P = styled.p``;

export const InputTitle = styled.div`
  margin-top: 10px;
  color: black;
`;

export const Alert = styled.span`
  color: red;
  font-size: 10px;
`;

export const Input = styled.input`
  margin-top: 10px;
  width: 250px;
  height: 25px;
  padding-left: 5px;
`;

export const SubmitButton = styled.button`
  background-color: #fad312;
  padding: 13px 31px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  margin-top: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(105%);
  }
`;

export const RadioItem = styled.div`
  margin-top: 10px;
`;
