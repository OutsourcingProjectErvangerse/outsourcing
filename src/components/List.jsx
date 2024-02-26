import React from 'react';
import { useSelector } from 'react-redux';

function List() {
  const selector = useSelector((state) => state.list);

  console.log(selector);

  return <div>List</div>;
}

export default List;
