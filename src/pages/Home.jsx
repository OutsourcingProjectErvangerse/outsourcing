import React from 'react';
import styled from 'styled-components';
import Location from '../components/Location';
import Search from '../components/Search';
import List from '../components/List';

function Home() {
  return (
    <StDiv>
      <Location />
      <section>
        <Search />
        <List />
      </section>
    </StDiv>
  );
}

export default Home;

const StDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
