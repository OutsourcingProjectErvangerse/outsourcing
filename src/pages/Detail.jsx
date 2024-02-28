import React from 'react';
import styled from 'styled-components';
import DetailForm from '../components/detailReview/ReviewForm';
import DetailList from '../components/detailReview/ReviewList';

function Detail() {
  return (
    <Container>
      <DetailForm />
      <DetailList />
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;
