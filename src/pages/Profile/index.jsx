import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
// import AlternateBanner from "../../assets/images/alternate-banner.jpg";
import AlternateBanner from "../../assets/images/banner.svg";
import EditIcon from "../../assets/icons/edit.svg";
// import { BlogBlock } from "../../components";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProfileScreen>
      <LeftContainer>
        <ProfileInfo>
          <ProfileBanner></ProfileBanner>
          <div className='absolute right-8 top-8 p-2 bg-[color:var(--secondary)] border-[0.1rem] border-[#eaeaea] text-white rounded-full hover:cursor-pointer z-20'>
            <img src={EditIcon} alt='' />
          </div>
          <ProfileInfoContainer>
            <img src={user.photoURL} alt={user.name} className='profile-pic' />

            <div className='flex items-start justify-between'>
              <div>
                <h1 className='profile-name'>{user.name}</h1>

                <h3 className='profile-email'>{user.email}</h3>

                <p className='profile-bio'>
                  {user.bio ? user.bio : "No bio yet"}
                </p>
              </div>

              <button className='bg-[color:var(--secondary)] px-4 py-2 lg:text-[1.25rem] text-[1.4rem] border-[0.1rem] border-[#eaeaea] text-white rounded-full hover:cursor-pointer'>
                Edit Profile
              </button>
            </div>
          </ProfileInfoContainer>
        </ProfileInfo>
      </LeftContainer>

      <RightContainer></RightContainer>
    </ProfileScreen>
  );
};

const ProfileScreen = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  max-width: 144rem;
  padding: 8rem 4rem 2rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 2rem;

  @media (max-width: 768px) {
    padding: 6rem 0 2rem;
    grid-template-columns: 1fr;
  }
`;

const LeftContainer = styled.div`
  grid-column: span 8 / span 8;
`;

const ProfileInfo = styled.div`
  border: 0.1rem solid #eaeaea;
  border-radius: 0.5rem;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 0;
    border: none;
    border-bottom: 0.1rem solid #eaeaea;
  }
`;

const ProfileBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-image: url(${AlternateBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 20rem;
  border-radius: 0.5rem 0.5rem 0 0;
  z-index: -1;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const ProfileInfoContainer = styled.div`
  padding: 2rem;
  position: relative;

  .profile-pic {
    margin-top: 6rem;
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    border: 0.1rem solid #eaeaea;
    display: block;
  }

  .profile-name {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
  }

  .profile-email {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .profile-bio {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    .profile-pic {
      margin-top: 9rem;
      width: 12rem;
      height: 12rem;
    }

    .profile-name {
      font-size: 1.8rem;
    }

    .profile-email {
      font-size: 1.4rem;
    }

    .profile-bio {
      font-size: 1.25rem;
    }
  }
`;

const RightContainer = styled.div`
  grid-column: span 4 / span 4;
`;

export default Profile;
