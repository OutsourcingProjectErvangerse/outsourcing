import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClick } from '../../shared/store/modules/listConnection';

const List = () => {
  const fetchListData = useSelector((state) => state.list);
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
    <div>
      {fetchListData.map((data) => (
        <div key={data.id}>
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
