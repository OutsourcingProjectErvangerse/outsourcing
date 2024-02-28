import React from 'react';
import styled from 'styled-components';
import logo from '../assets/imgs/logo.png';

const Header = () => {
  return (
    <>
      <StHeader>
        <img src={logo} alt="팔도 물어보살" />
        <h1>팔도 물어보살</h1>
      </StHeader>
    </>
  );
};

export default Header;

const StHeader = styled.header`
  padding: 25px 0 20px;
  background: linear-gradient(to right, #e1eec3, #eaeaea);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 28px;
  font-family: 'TTHakgyoansimSamulhamR';

  & > img {
    width: 30px;
  }
`;
