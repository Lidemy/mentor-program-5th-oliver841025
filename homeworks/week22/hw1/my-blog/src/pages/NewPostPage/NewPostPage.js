import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { AuthContext } from '../../contexts';
import { newPost } from '../../WebAPI';

const NewPostPageContainer = styled.div`
  margin: 128px auto 60px auto;
  width: 600px;
  height: 300px;
  box-sizing: border-box;
`;

const NewPostArea = styled.div`
  display: flex;
  width: 600px;
  box-sizing: border-box;
  }
`;

const NewPostAreaInput = styled.input`
  width: 600px;
  height: 40px;
  padding: 8px;
  font-size: 18px;
`;

const NewPostAreaTextarea = styled.textarea`
  margin-top: 16px;
  width: 600px;
  height: 200px;
  padding: 8px;
  font-size: 18px;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 8px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LoadingPage = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewPostPage = () => {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (!user) {
    history.push('/');
  }

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value);
  };

  const handleSubmit = () => {
    if (isLoadingRequest) {
      return;
    }
    if (user) {
      if (!titleValue || !contentValue) {
        return setErrorMessage('請勿留白');
      }
      // newPost api
      setIsLoadingRequest(true);
      newPost(titleValue, contentValue)
        .then((response) => {
          setIsLoadingRequest(false);
          console.log(response);
        })
        .catch((error) => {
          setIsLoadingRequest(false);
          setErrorMessage(error);
        });
      setTitleValue('');
      setContentValue('');
      history.push('/');
    }
    history.push('/');
  };

  return (
    <NewPostPageContainer>
      {isLoadingRequest && <LoadingPage>Loading...</LoadingPage>}
      {user && (
        <form onSubmit={handleSubmit}>
          <NewPostArea>
            <NewPostAreaInput
              type="text"
              placeholder="標題"
              value={titleValue}
              onChange={handleTitleChange}
            />
          </NewPostArea>
          <NewPostArea>
            <NewPostAreaTextarea
              type="text"
              placeholder="內文"
              value={contentValue}
              onChange={handleContentChange}
            />
          </NewPostArea>
          <Button>發布文章</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </form>
      )}
    </NewPostPageContainer>
  );
};

export default NewPostPage;
