import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

const LoginPageContainer = styled.div`
  margin-top: 64px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = async () => {
    setErrorMessage(null);
    const data = await login(username, password);
    if (data.ok === 0) {
      return setErrorMessage(data.message);
    }
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
    <LoginPageContainer>
      <form onSubmit={handleSubmit}>
        <div>
          username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>登入</button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LoginPageContainer>
  );
};

export default LoginPage;
