import React from "react";
import styled from "styled-components/macro";
import day from "dayjs";
import RenderRichText from "../../../../components/RichText/RenderRichText";

const BlogContainer = ({ blog }) => {
  const time =
    blog.timestamp.seconds * 1000 + blog.timestamp.nanoseconds / 1000000;

  return (
    <BlogWrapper>
      <img
        src={blog.thumbnailURL}
        alt={blog.slug}
        className='blog__thumbnail'
      />

      <ContentWrapper>
        <div className='author__container'>
          <img
            src={blog.author.photoURL}
            alt={blog.author.name}
            className='author__photo'
          />

          <div>
            <h3 className='author__name'>{blog.author.name}</h3>
            <p className='blog__date'>Posted on {day(time).format("MMM DD")}</p>
          </div>
        </div>

        <h1 className='blog__title'>{blog.title}</h1>
        <br />
        <br />
        <div className='blog__content'>
          {/* {blog.content.split("\n").map((str, index) => (
            <p key={index}>{str}</p>
            ))} */}
          <RenderRichText content={blog.content} />
        </div>
      </ContentWrapper>
    </BlogWrapper>
  );
};

const BlogWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;

  .blog__thumbnail {
    width: 100%;
    max-height: 40rem;
    height: auto;
    object-fit: cover;
    border-radius: 0.4rem 0.4rem 0 0;
  }

  @media (max-width: 768px) {
    background-color: transparent;
    border-radius: 0;
    border: none;

    .blog__thumbnail {
      max-height: 24rem;
      border-radius: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 0 2rem 2rem;

  .author__container {
    display: flex;
    align-items: center;
    margin: 2rem 0;

    .author__photo {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: 1rem;
      object-fit: cover;
      display: inline-block;
      border: 0.1rem solid #eaeaea;
    }

    .author__name {
      font-size: 1.4rem;
      font-weight: 700;
      color: #3d3d3d;
    }

    .blog__date {
      font-size: 1.2rem;
      color: #777;
    }
  }

  .blog__title {
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 4.8rem;
  }

  .blog__description {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
  }

  .blog__content {
    p {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    .blog__title {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 3.2rem;
    }

    .blog__description {
      font-size: 1.6rem;
    }

    .blog__content {
      p {
        font-size: 1.4rem;
      }
    }
  }
`;

export default BlogContainer;
