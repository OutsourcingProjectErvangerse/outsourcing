import React from 'react';
import styled from 'styled-components';
import Location from '../components/Location';
import Search from '../components/Search';
import List from '../components/homeList/List';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <Container>
        <Location />
        <SearchListArea>
          <Search />
          <List />
        </SearchListArea>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

const Container = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  height: 100vh;
  gap: 20px;
`;

const SearchListArea = styled.section`
  width: 40%;
  overflow: auto;
  padding-right: 20px;
`;
