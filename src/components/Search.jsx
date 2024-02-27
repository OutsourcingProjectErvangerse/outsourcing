import React from 'react';
import SearchIcon from '../assets/search.svg';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { addTodo } from '../shared/store/modules/test';
import { changeSearchText } from '../shared/store/modules/search';

function Search() {
  const text = useSelector((state) => state.search);
  console.log(text);

  const dispatch = useDispatch();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const search = event.target.search.value;

    if (!search) {
      alert('장소 및 주소를 입력해주세요.');
      return;
    }

    dispatch(changeSearchText(search));
    event.target.reset();
  };

  return (
    <SearchForm onSubmit={handleSearchSubmit}>
      <input type="text" placeholder="장소, 주소 검색" name="search" />
      <button>
        <img src={SearchIcon} alt="Search" />
      </button>
    </SearchForm>
  );
}

export default Search;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  & input {
    width: 300px;
    height: 40px;
    padding: 10px;
  }

  & button {
    width: 40px;
    height: 40px;
    padding: 0;
  }
  & button > img {
    width: 30px;
    height: 35px;
  }
`;
