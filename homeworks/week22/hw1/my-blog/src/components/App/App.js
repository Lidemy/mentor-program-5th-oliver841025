import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Header';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import RegisterPage from '../../pages/RegisterPage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import ListPage from '../../pages/ListPage';
import SinglePostPage from '../../pages/SinglePostPage';
import { AuthContext } from '../../contexts';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div``;

const App = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/logout">
              <LogoutPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/list">
              <ListPage />
            </Route>
            <Route path="/posts/:id">
              <SinglePostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
};

export default App;
