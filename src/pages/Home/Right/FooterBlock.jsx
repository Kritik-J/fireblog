import React from "react";
import styled from "styled-components/macro";

const FooterBlock = () => {
  return (
    <FooterContainer>
      <ul>
        <li>Blogs</li>
      </ul>
      <ul>
        <li>Contact</li>
        <li>About</li>
      </ul>
      <ul>
        <li>Join now</li>
      </ul>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  margin-top: 1rem;
  color: #777;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export default FooterBlock;
