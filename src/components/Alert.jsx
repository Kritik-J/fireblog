import React from "react";
import styled from "styled-components/macro";

const Alert = ({ children, status }) => {
  return (
    <AlertContainer>
      <div className={`alert__box ${status}`}>{children}</div>
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;

  .alert__box {
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .success {
    background-color: #4caf50;
  }

  .warning {
    background-color: #ff9800;
  }

  .error {
    background-color: #f44336;
  }

  .info {
    background-color: #2196f3;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default Alert;
