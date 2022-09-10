import React from "react";
import SearchBlock from "./SearchBlock";

const Left = () => {
  return (
    <div className="h-full relative">
      <div className="sticky top-[8rem] left-0 right-0 sm:relative sm:top-0">
        <SearchBlock />
      </div>
    </div>
  );
};

export default Left;
