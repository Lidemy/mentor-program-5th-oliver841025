import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFivePosts, getTotalPostsCounts } from '../../WebAPI';
import { Link } from 'react-router-dom';

const ListPageContainer = styled.div`
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

const PaginatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
`;

const NextPageButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  box-sizing: border-box;
`;

const LastPageButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  box-sizing: border-box;
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

const Post = ({ post }) => {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
};

Post.protoTypes = {
  post: PropTypes.object,
};

const ListPage = () => {
  const [posts, setPosts] = useState([]);
  const [totalPostsCounts, setTotalPostsCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [nowPage, setNowPage] = useState(1);

  const handleNextPageClick = () => {
    if (nowPage <= totalPostsCounts / 5) {
      setNowPage(nowPage + 1);
    }
  };

  const handleLastPageClick = () => {
    if (nowPage <= 1) return;
    setNowPage(nowPage - 1);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getFivePosts(nowPage)
      .then((posts) => {
        setIsLoading(false);
        setPosts(posts);
        console.log(nowPage);
        console.log(nowPage * posts.length);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
    getTotalPostsCounts()
      .then((totalPostsCounts) => {
        setTotalPostsCounts(totalPostsCounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [nowPage]);

  return (
    <ListPageContainer>
      {isLoading && <LoadingPage>Loading...</LoadingPage>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <PaginatorContainer>
        {!isLoading && nowPage <= 1 && <div>這是第一頁囉</div>}
        {!isLoading && nowPage >= 2 && (
          <LastPageButton onClick={handleLastPageClick}>上一頁</LastPageButton>
        )}
        {!isLoading && nowPage > totalPostsCounts / 5 && (
          <div>這是最後一頁囉</div>
        )}
        {!isLoading && nowPage <= totalPostsCounts / 5 && (
          <NextPageButton onClick={handleNextPageClick}>下一頁</NextPageButton>
        )}
      </PaginatorContainer>
    </ListPageContainer>
  );
};

export default ListPage;
