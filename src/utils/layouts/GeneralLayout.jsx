import React from "react";
import { Header } from "../../components";
import { Outlet } from "react-router-dom";

const GeneralLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children ? children : <Outlet />}
    </div>
  );
};

export default GeneralLayout;
