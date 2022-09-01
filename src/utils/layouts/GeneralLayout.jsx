import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, ProfileMenu } from "../../components";
import { Outlet } from "react-router-dom";
import MenuLayout from "./MenuLayout";
import { closeProfileMenu } from "../../features/menu/menuSlice";

const GeneralLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { profileMenu } = useSelector((state) => state.menu);

  return (
    <div>
      <Header />
      {profileMenu && (
        <MenuLayout
          children={<ProfileMenu />}
          isVisible={profileMenu}
          setIsVisible={() => {
            dispatch(closeProfileMenu());
          }}
        />
      )}
      {children ? children : <Outlet />}
    </div>
  );
};

export default GeneralLayout;
