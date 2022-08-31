import React from "react";
import styled from "styled-components/macro";

const Loader = ({ position, radius }) => {
  return (
    <LoaderContainer position={position} radius={radius}>
      <div
        className="indeterminate
        bg-teal-200
      "
      ></div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow: hidden;
  margin: 0 auto;
  position: ${(props) => (props.position ? props.position : "fixed")};
  border-radius: ${(props) => (props.radius ? props.radius : "0")};

  .indeterminate {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .indeterminate:before {
    content: "";
    position: absolute;
    height: 100%;
    /* background-color: #03a9f4; */
    background-color: #00d8bb;

    animation: indeterminate_first 2.5s infinite ease-out;
  }

  .indeterminate:after {
    content: "";
    position: absolute;
    height: 100%;
    /* background-color: #4fc3f7; */
    background-color: var(--secondary);
    animation: indeterminate_second 2.5s infinite ease-in;
  }

  @keyframes indeterminate_first {
    0% {
      left: -100%;
      width: 100%;
    }

    100% {
      left: 100%;
      width: 10%;
    }
  }

  @keyframes indeterminate_second {
    0% {
      left: -150%;
      width: 100%;
    }

    100% {
      left: 100%;
      width: 10%;
    }
  }
`;

export default Loader;
