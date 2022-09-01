import React from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../features/auth/authAPI";
import { closeProfileMenu } from "../../features/menu/menuSlice";

const ProfileMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(closeProfileMenu());
    dispatch(logoutAsync());
  };

  return (
    <ProfileMenuContainer>
      <Triangle></Triangle>

      <ProfileMenuItem
        onClick={() => {
          history("/profile");
          dispatch(closeProfileMenu());
        }}
      >
        Signed in as&nbsp;
        <span className="">{user.name}</span>
      </ProfileMenuItem>

      <ProfileMenuItem
        onClick={() => {
          history("/profile");
          dispatch(closeProfileMenu());
        }}
      >
        Your Profile
      </ProfileMenuItem>

      <ProfileMenuItem onClick={handleLogout}>Logout</ProfileMenuItem>
    </ProfileMenuContainer>
  );
};

const Triangle = styled.div`
  width: 3rem;
  height: 2rem;
  position: absolute;
  top: -2rem;
  right: 1rem;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    background: white;
    transform: rotate(45deg);
    top: 1rem;
    right: 0.5rem;

    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  }
`;

const ProfileMenuContainer = styled.div`
  position: absolute;
  top: 6.4rem;
  right: 0;
  padding: 0.4rem 0;

  border-radius: 0.4rem;
  background-color: white;
  width: 18rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
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

  &:last-child {
    border-bottom: none;
  }
`;

export default ProfileMenu;
