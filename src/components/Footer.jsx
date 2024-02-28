import React from 'react';
import styled from 'styled-components';
import github from '../assets/imgs/gitHub.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <StFooter>
      <StDiv>
        <StFigure>
          <p>이준구</p>
          <StLink to={'https://github.com/LeeJunGoo'}>
            <img src={github} alt="이미지 로딩중"></img>
          </StLink>
        </StFigure>

        <StFigure>
          <p>안주원</p>
          <StLink to={'https://github.com/joo1e'}>
            <img src={github} alt="이미지 로딩중"></img>
          </StLink>
        </StFigure>

        <StFigure>
          <p>박영욱</p>
          <StLink to={'https://github.com/ugyobppang'}>
            <img src={github} alt="이미지 로딩중"></img>
          </StLink>
        </StFigure>

        <StFigure>
          <p>정윤아</p>
          <StLink to={'https://github.com/yuriyun88'}>
            <img src={github} alt="이미지 로딩중"></img>
          </StLink>
        </StFigure>
      </StDiv>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  background: linear-gradient(to right, #e1eec3, #eaeaea);
  padding: 40px 0 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StDiv = styled.div`
  display: flex;
  gap: 30px;
`;

const StLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  & > img {
    width: 35px;
  }
`;

const StFigure = styled.figure``;
