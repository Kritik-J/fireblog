import React from "react";
import styled from "styled-components/macro";

const BlogContainer = ({ blog }) => {
  return (
    <BlogWrapper>
      <img
        src={blog.thumbnailURL}
        alt={blog.slug}
        className="blog__thumbnail"
      />

      <h2 className="blog__title">{blog.title}</h2>

      <p className="blog__description"> {blog.description} </p>

      <div className="blog__content">{blog.content}</div>
    </BlogWrapper>
  );
};

const BlogWrapper = styled.div`
  .blog__thumbnail {
    width: 100%;
    max-height: 36rem;
    height: auto;
    object-fit: cover;
    border-radius: 0.4rem;
  }

  .blog__title {
    font-size: 2.4rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }

  .blog__description {
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
  }

  .blog__content {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    .blog__thumbnail {
      max-height: 24rem;
    }

    .blog__title {
      font-size: 1.8rem;
    }

    .blog__description {
      font-size: 1.4rem;
    }

    .blog__content {
      font-size: 1.4rem;
    }
  }
`;

export default BlogContainer;
