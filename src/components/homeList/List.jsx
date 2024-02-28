import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClick } from '../../shared/store/modules/listConnection';
import styled from 'styled-components';

const List = () => {
  const fetchListData = useSelector((state) => state.list);
  console.log(fetchListData);
  const [isHovered, setIsHovered] = useState(false);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleMouseOver = (data) => {
    setIsHovered(true);
    setContent(data);
    dispatch(getClick({ isClick: true, id: data.id }));
    console.log(isHovered);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    dispatch(getClick(false));
  };

  return (
    <StUl>
      {fetchListData.map((data) => (
        <StLi
          key={data.id}
          onMouseOver={() => handleMouseOver(data)}
          onMouseOut={handleMouseOut}
          style={{ color: isHovered && content.id === data.id ? 'gray' : '#b5b5b5' }}
        >
          <StLink to={`/detail/${data.id}`}>{data.place_name}</StLink>
          <p>{data.category_group_name}</p>
          <p>{data.address_name}</p>
          <p>{data.phone}</p>
        </StLi>
      ))}
    </StUl>
  );
};

export default List;
const StUl = styled.ul`
  width: 100%;
  height: 729px;
  border-radius: 5px;
  overflow: auto;
`;
const StLi = styled.li`
  border: 1px solid black;
  margin-top: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100px;
  border-radius: 8px;
  background-color: white;
`;
const StLink = styled(Link)`
  color: black;
  text-decoration: none;

  p {
    &:hover {
      text-decoration: underline; /* 선택된 상태에서는 밑줄을 나타낸다. */
    }
  }
`;
