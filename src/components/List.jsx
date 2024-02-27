import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = () => {
  const fetchListData = useSelector((state) => state.list);
  console.log(fetchListData);
  const [isHovered, setIsHovered] = useState(false);
  const [content, setContent] = useState('');
  const handleMouseOver = (data) => {
    setIsHovered(true);
    setContent(data);
    console.log(isHovered);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  {
    /* <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
  <a href="#" class="list-group-item list-group-item-action">A third link item</a>
  <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
  <a class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
</div> */
  }

  return (
    <StUl>
      {fetchListData.map((data) => (
        <StLi
          key={data.id}
          onMouseOver={() => handleMouseOver(data)}
          onMouseOut={handleMouseOut}
          style={{ color: isHovered && content.id === data.id ? '#ccc' : 'white' }}
        >
          <p>{data.address_name}</p>
          <p>{data.category_group_name}</p>
          <p>{data.phone}</p>
          <StLink to={`/detail/${data.id}`}>{data.place_name}</StLink>
        </StLi>
      ))}
    </StUl>
  );
};

export default List;
const StUl = styled.ul`
  width: 100%;
`;
const StLi = styled.li`
  border: 1px solid black;
  margin-top: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100px;
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
