import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
import { useParams } from 'react-router';

const SinglePostContainer = styled.div`
  padding: 0 30px;
  max-width: 960px;
  margin: 8px auto;
  margin-top: 96px;
`;

const SinglePostHeader = styled.div`
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SinglePostBody = styled.div`
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
`;

const SinglePostTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const SinglePostDate = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 16px;
`;

const SinglePost = ({ post }) => {
  return (
    <div>
      <SinglePostHeader>
        <SinglePostTitle>{post && post.title}</SinglePostTitle>
        <SinglePostDate>
          {post && new Date(post.createdAt).toLocaleString()}
        </SinglePostDate>
      </SinglePostHeader>
      <SinglePostBody>{post && post.body}</SinglePostBody>
    </div>
  );
};

const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost(id)
      .then((data) => setPost(data))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <SinglePostContainer>
      <SinglePost post={post} />
    </SinglePostContainer>
  );
};

export default SinglePostPage;
