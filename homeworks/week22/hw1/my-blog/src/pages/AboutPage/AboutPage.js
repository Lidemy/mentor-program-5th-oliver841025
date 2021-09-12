import React from 'react';
import styled from 'styled-components';

const AboutPageContainer = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutPageContent = styled.div`
  padding: 16px;
  margin-top: 16px;
`;

const AboutPage = () => {
  return (
    <AboutPageContainer>
      <AboutPageContent>
        一款基本的部落格，別以為我是 Medium 喔 O_O
      </AboutPageContent>
    </AboutPageContainer>
  );
};

export default AboutPage;
