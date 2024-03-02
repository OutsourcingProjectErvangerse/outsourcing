import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getReview } from '../../api/api';
import ReviewListItem from './ReviewListItem';

const ReviewList = () => {
  const { id } = useParams();
  // {
  //   data: reviews,
  //   isLoading,
  //   error
  // }
  const query = useQuery({
    queryKey: ['reviews'],
    queryFn: getReview
  });

  if (query.isLoading) {
    return <div>로딩중입니다</div>;
  }

  if (query.error) {
    return <div>글을 작성해주세요</div>;
  }

  console.log(query);
  // const filterReviews = reviews.filter((item) => item.place_id === id);
  const filterReviews = query.data.filter((item) => item.place_id === id);

  return (
    <ul>
      {filterReviews.map((item) => (
        <ReviewItemContainer key={item.id}>
          <ReviewListItem review={item} />
        </ReviewItemContainer>
      ))}
    </ul>
  );
};

export default ReviewList;

const ReviewItemContainer = styled.li`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 40px 40px 70px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
