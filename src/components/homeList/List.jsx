import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';
import styled from 'styled-components';

const List = () => {
  const fetchListData = useSelector((state) => state.list);

  return (
    <UlWrapper>
      <StUl>
        {fetchListData.map((data) => (
          <ListItem data={data} key={data.id}></ListItem>
        ))}
      </StUl>
    </UlWrapper>
  );
};

export default List;

const UlWrapper = styled.div`
  width: 100%;
`;

const StUl = styled.ul``;
