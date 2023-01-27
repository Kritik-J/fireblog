import React from "react";
import RecomendedBlock from "./RecomendedBlock";
// import FooterBlock from "./FooterBlock";

const Right = () => {
  return (
    <div className='h-full'>
      <div className='sticky top-[8rem] left-0 right-0 sm:relative sm:top-0'>
        <RecomendedBlock />
        {/* <FooterBlock /> */}
      </div>
    </div>
  );
};

export default Right;
