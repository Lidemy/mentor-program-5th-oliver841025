import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getPosts } from '../../WebAPI';
import { Link } from 'react-router-dom';

const HomePageContainer = styled.div`
  width: 80%;
  margin: 64px auto 0 auto;
`;

const PostContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(1, 12, 34, 0.2);
`;

const PostTitle = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 24px;
`;

const PostDate = styled.p``;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [posts]);

  return (
    <HomePageContainer>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </HomePageContainer>
  );
};

export default HomePage;
