import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import day from "dayjs";

const BlogBlock = ({ blog }) => {
  const time =
    blog.timestamp.seconds * 1000 + blog.timestamp.nanoseconds / 1000000;

  return (
    <BlogContainer>
      <div className="blog__info">
        <h1 className="blog__title">
          <Link to="/blog/1">{blog.title}</Link>
        </h1>

        <p className="blog__description">{blog.description}</p>

        <div className="blog__author">
          <img
            className="blog__author-image"
            src={blog.author.photoURL}
            alt={blog.author.name}
          />

          <p className="blog__author-name">{blog.author.name}</p>
        </div>

        <div className="blog__createdAt">
          <p className="blog__createdAt-date">
            {day(time).format("DD MMM YYYY")}
          </p>

          <p className="blog__createdAt-time">
            {day(time).format("hh:mm:ss a")}
          </p>
        </div>
      </div>

      {/* <Link to="/blog/1"> */}
      <img src={blog.thumbnailURL} alt="blog" className="blog__image" />
      {/* </Link> */}
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 0.1rem solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  .blog__title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .blog__description {
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .blog__author {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  .blog__author-image {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .blog__author-name {
    font-size: 1.4rem;
    /* font-weight: 500; */
  }

  .blog__createdAt {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .blog__createdAt-date {
    font-size: 1.4rem;
    margin-right: 1rem;
  }

  .blog__createdAt-time {
    font-size: 1.4rem;
  }

  .blog__image {
    width: 18rem;
    height: 12rem;
    object-fit: cover;
    margin-left: 1rem;
    border-radius: 0.4rem;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .blog__title {
      font-size: 1.6rem;
    }

    .blog__description,
    .blog__author-name,
    .blog__createdAt-date,
    .blog__createdAt-time {
      font-size: 1.25rem;
    }

    .blog__image {
      width: 16rem;
      height: 12rem;
    }
  }
`;

export default BlogBlock;
