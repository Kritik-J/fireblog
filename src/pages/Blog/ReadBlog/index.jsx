import React from "react";
import styled from "styled-components/macro";
import Left from "./Left";
import Right from "./Right";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogAsync } from "../../../features/blog/blogAPI";

const ReadBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { readBlog } = useSelector((state) => state.blog);

  React.useEffect(() => {
    if (!readBlog || readBlog.slug !== id) {
      dispatch(getBlogAsync(id));
    }
  }, [dispatch, id, readBlog]);

  return (
    <ReadBlogScreen>
      <LeftContainer>
        <Left />
      </LeftContainer>
      <RightContainer>
        <Right />
      </RightContainer>
    </ReadBlogScreen>
  );
};

const ReadBlogScreen = styled.div`
  min-height: 100vh;
  max-width: 144rem;
  margin: 0 auto;
  padding: 8rem 4rem 2rem;
  display: grid;
  grid-template-columns: 5fr 3fr;

  @media (max-width: 768px) {
    padding: 8rem 2rem 2rem;
    display: flex;
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  padding-right: 1rem;
  border-right: 0.1rem solid #eaeaea;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const RightContainer = styled.div`
  padding-left: 1rem;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 2rem;
  }
`;

export default ReadBlog;
