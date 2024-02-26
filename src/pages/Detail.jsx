import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { singleList } from '../api/api';

function Detail() {
  const { id } = useParams();
  console.log(id);
  const {
    data: detailData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['detailDatas', id],
    queryFn: () => singleList(id)
  });

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }
  if (error) {
    return <div>에러입니다</div>;
  }
  console.log(detailData);
  return <div></div>;
}

export default Detail;
