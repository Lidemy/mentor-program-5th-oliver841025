import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { getMe, register } from "../../WebAPI";

const ErrorMessage = styled.div`
  color: red;
`;

const RegisterPageContainer = styled.div`
  margin-top: 64px;
`;

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleSubmit = async () => {
    setErrorMessage(null);
    const data = await register(username, password, nickname);
    if (data.ok === 0) {
      return setErrorMessage(data.message);
    }
    alert("註冊成功");
    setAuthToken(data.token);

    const response = await getMe();
    if (response.ok !== 1) {
      setAuthToken(null);
      return setErrorMessage(response.message.toString());
    }
    setUser(response.data);
    history.push("/");
  };

  return (
    <RegisterPageContainer>
      <form onSubmit={handleSubmit}>
        <div>
          username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
        </div>
        <div>
          nickname:{" "}
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => setErrorMessage(null)}
          />
        </div>
        <button>註冊</button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RegisterPageContainer>
  );
};

export default RegisterPage;
