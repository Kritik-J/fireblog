import React from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../features/auth/authAPI";

const ProfileMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <ProfileMenuContainer>
      <ProfileMenuItem
        onClick={() => {
          history("/profile");
        }}
      >
        Signed in as&nbsp;
        <span className="">{user.name}</span>
      </ProfileMenuItem>

      <ProfileMenuItem
        onClick={() => {
          history("/profile");
        }}
      >
        Your Profile
      </ProfileMenuItem>

      <ProfileMenuItem onClick={handleLogout}>Logout</ProfileMenuItem>
    </ProfileMenuContainer>
  );
};

const ProfileMenuContainer = styled.div`
  position: fixed;
  top: 6.4rem;
  right: 4rem;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;
  background-color: white;
  width: 18rem;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.3);
`;

const ProfileMenuItem = styled.div`
  padding: 0.8rem 1.6rem;
  border-bottom: 0.1rem solid #eaeaea;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--secondary);
    color: white;
    cursor: pointer;
  }

  &:first-child {
    border-radius: 0.4rem 0.4rem 0 0;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 0.4rem 0.4rem;
  }
`;

export default ProfileMenu;
