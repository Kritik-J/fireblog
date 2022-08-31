import React from "react";
import styled from "styled-components";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";

const Home = () => {
  return (
    <HomeScreen>
      <LeftContainer>
        <Left />
      </LeftContainer>

      <CenterContainer>
        <Center />
      </CenterContainer>

      <RightContainer>
        <Right />
      </RightContainer>
    </HomeScreen>
  );
};

const HomeScreen = styled.div`
  min-height: 100vh;
  padding: 6rem 4rem 0;
  max-width: 144rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 5fr 2fr;

  @media (max-width: 768px) {
    padding: 6rem 2rem 0;
    display: flex;
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding-right: 0;
    margin: 1rem 0;
  }
`;

const CenterContainer = styled.div`
  border-right: 0.1rem solid #eaeaea;
  border-left: 0.1rem solid #eaeaea;

  @media (max-width: 768px) {
    border-right: none;
    border-left: none;
  }
`;

const RightContainer = styled.div`
  padding-left: 1rem;

  @media (max-width: 768px) {
    padding-left: 0;
    margin: 2rem 0 1rem;
  }
`;

export default Home;
