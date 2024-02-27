import React from 'react';
import styled from 'styled-components';
import Location from '../components/Location';
import Search from '../components/Search';

function Home() {

  const navigate = useNavigate();

  return (
    <StDiv>
      <Location />
      <Search />
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
