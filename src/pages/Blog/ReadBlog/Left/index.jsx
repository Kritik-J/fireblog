import React from "react";
import { useSelector } from "react-redux";
// import styled from "styled-components/macro";
import { Loader } from "../../../../components";
import BlogContainer from "./BlogContainer";

const Left = () => {
  const { readBlogLoading, readBlog } = useSelector((state) => state.blog);

  return (
    <div className="h-full relative">
      {readBlogLoading ? (
        <Loader />
      ) : (
        <>{readBlog && <BlogContainer blog={readBlog} />}</>
      )}
    </div>
  );
};

export default Left;
