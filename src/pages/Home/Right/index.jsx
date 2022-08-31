import React from "react";
import RecomendedBlock from "./RecomendedBlock";

const Right = () => {
  return (
    <div className="h-full">
      <div className="sticky top-[7rem] left-0 right-0 sm:relative sm:top-0">
        <RecomendedBlock />
      </div>
    </div>
  );
};

export default Right;
