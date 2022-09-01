import React from "react";
import styled from "styled-components/macro";

const About = () => {
  return <AboutScreen>About</AboutScreen>;
};

const AboutScreen = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  max-width: 144rem;
  padding: 8rem 4rem 2rem;

  @media (max-width: 768px) {
    padding: 8rem 2rem 2rem;
  }
`;

export default About;
