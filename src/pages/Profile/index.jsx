import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProfileScreen>
      <UserDetailsContainer>
        <UserAvatar src={user.photoURL} alt={user.name} />

        <UserDetails>
          <h2 className="user__name">{user.name}</h2>
          <h3 className="user__email">{user.email}</h3>
        </UserDetails>

        <EditProfileButton>
          <i className="fas fa-user-edit"></i>
          Edit Profile
        </EditProfileButton>
      </UserDetailsContainer>
    </ProfileScreen>
  );
};

const ProfileScreen = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  max-width: 144rem;
  padding: 8rem 4rem 2rem;
  display: grid;
  grid-template-columns: 2fr 6fr;

  @media (max-width: 768px) {
    padding: 8rem 2rem 2rem;
  }
`;

const UserDetailsContainer = styled.div`
  padding-right: 1rem;
  /* border-right: 1px solid #eaeaea; */
`;

const UserAvatar = styled.img`
  width: 25.6rem;
  height: 25.6rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 0.2rem solid #eaeaea;
  object-fit: cover;
`;

const UserDetails = styled.div`
  .user__name {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .user__email {
    font-size: 1.6rem;
  }
`;

const EditProfileButton = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;
  background-color: var(--secondary);
  color: #fff;
  width: 100%;
  margin-top: 2rem;
  border: 0.1rem solid #eaeaea;
`;

export default Profile;
