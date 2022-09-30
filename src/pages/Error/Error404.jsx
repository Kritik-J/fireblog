import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Error404 = () => {
  return (
    <PageNotFound>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Go Back Home</Link>
    </PageNotFound>
  );
};

const PageNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  max-width: 144rem;

  h1 {
    font-size: 12rem;
    font-weight: 700;
    color: var(--secondary);
    line-height: 1.25;
  }

  h2 {
    font-size: 4.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  a {
    font-size: 1.8rem;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: var(--secondary);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 7.2rem;
    }

    h2 {
      font-size: 2.4rem;
    }

    a {
      font-size: 1.4rem;
    }
  }
`;

export default Error404;
