import React from "react";
import styled from "styled-components/macro";

const LazyBlogBlock = () => {
  return (
    <BlogContainer className="animate-pulse">
      <div className="blog__info">
        <div className="blog__title__1" />
        <div className="blog__title__2" />

        <div className="blog__author">
          <div className="blog__author-image" />

          <div className="blog__author-name" />
        </div>

        <div className="blog__createdAt">
          <div className="blog__createdAt-date" />

          <div className="blog__createdAt-time" />
        </div>
      </div>

      <div className="flex items-center h-full">
        <div className="blog__image" />
      </div>
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem;
  padding: 2rem;
  border-bottom: 0.1rem solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  .blog__info {
    width: 90%;
  }

  .blog__title__1 {
    height: 1.8rem;
    margin-bottom: 0.5rem;
    background-color: #eaeaea;
  }

  .blog__title__2 {
    height: 1.8rem;
    background-color: #eaeaea;
    width: 70%;
  }

  .blog__author {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    .blog__author-image {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      margin-right: 1rem;
      background-color: #eaeaea;
    }

    .blog__author-name {
      height: 1.4rem;
      width: 8.4rem;
      background-color: #eaeaea;
    }
  }

  .blog__createdAt {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .blog__createdAt-date {
    height: 1.4rem;
    margin-right: 1rem;
    width: 5.4rem;
    background-color: #eaeaea;
  }

  .blog__createdAt-time {
    height: 1.4rem;
    width: 5.4rem;
    background-color: #eaeaea;
  }

  .blog__image {
    /* min-width: 18rem; */
    width: 100%;
    height: 12rem;
    border-radius: 0.4rem;
    display: block;
    background-color: #eaeaea;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .blog__title__1,
    .blog__title__2 {
      height: 1.6rem;
    }

    .blog__createdAt-date,
    .blog__createdAt-time {
      height: 1.125rem;
    }

    .blog__author {
      .blog__author-name {
        height: 1.125rem;
      }

      .blog__author-image {
        width: 2.4rem;
        height: 2.4rem;
      }
    }

    .blog__image {
      min-width: 14rem;
      height: 10rem;
    }
  }
`;

export default LazyBlogBlock;
