import React from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleProfileMenu } from "../features/menu/menuSlice";

const Header = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleJoin = () => {
    history("/register");
  };

  return (
    <HeaderContainer>
      <Navbar>
        <NavLinkElement to="/">
          {/* <img className="navbar__logo" src="" alt="logo" /> */}
          <h2 className="navbar__logo">🔥FireBlog</h2>
        </NavLinkElement>

        {/* <NavbarSearch></NavbarSearch> */}

        <NavbarLinks>
          {/* <NavLinkElement to="/about">About</NavLinkElement>
          <NavLinkElement to="/contact">Contact</NavLinkElement> */}
          <WriteButton to="/create-blog">Write</WriteButton>
          {isAuthenticated ? (
            <Avatar
              src={user.photoURL}
              alt={user.name}
              onClick={() => {
                dispatch(toggleProfileMenu());
              }}
            />
          ) : (
            <JoinButton onClick={handleJoin}>Join now</JoinButton>
          )}
        </NavbarLinks>
      </Navbar>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  z-index: 9999;
  background-color: var(--primary);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
`;

const Navbar = styled.nav`
  max-width: 144rem;
  margin: 0 auto;
  position: relative;
  padding: 0 4rem;
  height: 6rem;
  background-color: var(--primary);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar__logo {
    font-size: 2.4rem;
    color: #000;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;

    .navbar__logo {
      font-size: 1.8rem;
    }
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinkElement = styled(NavLink)`
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: 1.5rem;

  &:hover {
    color: var(--secondary);
  }

  &.active {
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const JoinButton = styled.button`
  background-color: var(--secondary);
  color: var(--primary);
  padding: 0.6rem 1.4rem;
  border-radius: 4rem;
  border: none;
  font-size: 1.6rem;
  font-weight: 600;

  &:hover {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  object-fit: cover;
  display: block;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 3.2rem;
    width: 3.2rem;
  }
`;

const WriteButton = styled(NavLinkElement)`
  color: var(--secondary);
  padding: 0.6rem 1.4rem;
  border-radius: 4rem;
  border: none;
  border: 1px solid var(--secondary);

  &:hover {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

export default Header;
