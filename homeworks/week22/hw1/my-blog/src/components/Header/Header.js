import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 32px;
  box-sizing: border-box;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 32px;
  }
`;

const Brand = styled.h2``;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  ${(props) => props.$active && `background: rgba(0,0,0,0.2)`}
`;

const NotLoginArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation('/');
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>MY BLOG</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === '/'}>
            首頁
          </Nav>
          <Nav to="/about" $active={location.pathname === '/about'}>
            關於
          </Nav>
          <Nav to="/list" $active={location.pathname === '/list'}>
            文章列表
          </Nav>
          {user && (
            <Nav to="/new-post" $active={location.pathname === '/new-post'}>
              發布文章
            </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <RightContainer>
        <NavbarList>
          {user && (
            <Nav
              to="/logout"
              $active={location.pathname === '/logout'}
              onClick={handleLogout}
            >
              登出
            </Nav>
          )}
          {!user && (
            <NotLoginArea>
              <Nav to="/register" $active={location.pathname === '/register'}>
                註冊
              </Nav>
              <Nav to="/login" $active={location.pathname === '/login'}>
                登入
              </Nav>
            </NotLoginArea>
          )}
        </NavbarList>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
