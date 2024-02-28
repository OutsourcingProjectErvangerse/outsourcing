import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getReview } from '../../api/api';
import ReviewListItem from './ReviewListItem';

const ReviewList = () => {
  const { id } = useParams();

  const {
    data: reviews,
    isLoading,
    error
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReview
  });

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }

  if (error) {
    return <div>글을 작성해주세요</div>;
  }

  const filterReviews = reviews.filter((item) => item.place_id === id);

  return (
    <>
      {filterReviews.map((item) => (
        <ReviewItemContainer key={item.id}>
          <ReviewListItem review={item} />
        </ReviewItemContainer>
      ))}
    </>
  );
};

export default ReviewList;

const ReviewItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
