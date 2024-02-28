import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getClick } from '../../shared/store/modules/listConnection';

const ListItem = ({ data }) => {
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
    <>
      <StLi
        onMouseOver={() => handleMouseOver(data)}
        onMouseOut={handleMouseOut}
        style={{ color: isHovered && content.id === data.id ? '#FF6600' : '#333' }}
      >
        <Link to={`/detail/${data.id}`}>
          <StPlaceName>{data.place_name}</StPlaceName>
          <StGroupName>{data.category_group_name}</StGroupName>
          <StAddressName>{data.address_name}</StAddressName>
          <StPhone>{data.phone}</StPhone>
        </Link>
      </StLi>
    </>
  );
};

export default ListItem;

const StLi = styled.li`
  border: 1px solid #ff983f;
  height: 115px;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
  overflow: hidden;
  & > a {
    text-decoration: none;
    padding: 15px 20px;
    width: 100%;
    height: 100%;
    display: block;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  & > a:hover {
    color: #fff;
    background-color: #ff6600;
    border: 1px solid #ff6600;
  }
`;

const StPlaceName = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

const StGroupName = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

const StAddressName = styled.p`
  font-size: 14px;
`;

const StPhone = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
`;
