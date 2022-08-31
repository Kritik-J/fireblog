import React from "react";
import styled from "styled-components/macro";

const RecomendedBlock = () => {
  return (
    <RecommendedContainer className="bg-green-500">
      <h1 className="recommended__header">Recommended Blogs</h1>

      <ul className="recommended__list">
        <li>Web Development</li>
        <li>Web Development</li>
        <li>Web Development</li>
        <li>Web Development</li>
        <li>Web Development</li>
      </ul>
    </RecommendedContainer>
  );
};

const RecommendedContainer = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;

  .recommended__header {
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1rem;
    text-align: center;
    border-bottom: 0.1rem solid #eaeaea;
  }

  .recommended__list {
    padding: 1rem;

    li {
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 768px) {
    .recommended__header {
      font-size: 1.6rem;
    }

    .recommended__list {
      li {
        font-size: 1.25rem;
      }
    }
  }
`;

export default RecomendedBlock;
