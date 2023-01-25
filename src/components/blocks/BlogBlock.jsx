import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import day from "dayjs";

const BlogBlock = ({ blog }) => {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  const time =
    blog.timestamp.seconds * 1000 + blog.timestamp.nanoseconds / 1000000;

  window.addEventListener("resize", () => {
    setScreenSize(window.innerWidth);
  });

  return (
    <BlogContainer>
      <div className="blog__info">
        <h1 className="blog__title">
          <Link to={`/blog/${blog.slug}`}>
            {screenSize < 768 && blog.title.length > 64
              ? blog.title.slice(0, 64) + ".."
              : blog.title}
          </Link>
        </h1>

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

      <Link to={`/blog/${blog.slug}`}>
        <div className="flex items-center h-full">
          <img src={blog.thumbnailURL} alt="blog" className="blog__image" />
        </div>
      </Link>
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem;
  padding: 2rem 0;
  border-bottom: 0.1rem solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  .blog__info {
    width: 100%;
  }

  .blog__title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
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
      border: 0.2rem solid #eaeaea;
    }

    .blog__author-name {
      font-size: 1.4rem;
    }
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
    /* min-width: 18rem; */
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-radius: 0.4rem;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .blog__title {
      font-size: 1.6rem;
    }

    .blog__createdAt-date,
    .blog__createdAt-time {
      font-size: 1.125rem;
    }

    .blog__author {
      .blog__author-name {
        font-size: 1.125rem;
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

export default BlogBlock;
