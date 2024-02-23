import React from 'react';
import styled from 'styled-components';
import Location from '../components/Location';

function Home() {
  return (
    <StDiv>
      <Location />
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
