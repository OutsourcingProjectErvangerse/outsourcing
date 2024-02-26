import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const List = () => {
  const fetchListData = useSelector((state) => state.list);
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

  return (
    <div>
      {fetchListData.map((data) => (
        <div>
          <div
            key={data.id}
            onMouseOver={() => handleMouseOver(data)}
            onMouseOut={handleMouseOut}
            style={{ backgroundColor: isHovered && content.id === data.id ? 'red' : 'blue' }}
          >
            <p>{data.address_name}</p>
            <p>{data.category_group_name}</p>
            <Link to={`/detail/${data.id}`}>{data.place_name}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
