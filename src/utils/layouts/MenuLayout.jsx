import React from "react";
import styled from "styled-components/macro";
import ReactDOM from "react-dom";

const Menu = ({ children, isVisible, setIsVisible }) => {
  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <MenuWindow>
          <div className="overlay" onClick={setIsVisible}></div>

          <div className="menu">{children}</div>
        </MenuWindow>
      )}
    </>,
    document.getElementById("root")
  );
};

const MenuWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 9999;
  margin: 0 auto;
  max-width: 144rem;
  padding: 0 4rem;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background-color: transparent;
  }

  .menu {
    position: relative;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

export default Menu;
