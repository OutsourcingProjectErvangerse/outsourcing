import React from 'react';
import styled from 'styled-components';
import Location from '../components/Location';
import Search from '../components/Search';
import List from '../components/homeList/List';

function Home() {
  return (
    <Container>
      <Location />
      <SeachListArea>
        <Search />
        <List />
      </SeachListArea>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  height: 100vh;
`;

const SeachListArea = styled.div`
  width: 34%;
`;
