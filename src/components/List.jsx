import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const List = () => {
  const fetchListData = useSelector((state) => state.list);

  return (
    <div>
      {fetchListData.map((data) => (
        <div key={data.id}>
          <p>{data.address_name}</p>
          <p>{data.category_group_name}</p>
          <Link to={`/detail/${data.id}`}>{data.place_name}</Link>
        </div>
      ))}
    </div>
  );
};

export default List;
