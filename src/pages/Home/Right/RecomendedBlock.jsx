import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const RecomendedBlock = () => {
  const { recommendedBlogs } = useSelector((state) => state.blog);

  return (
    <RecommendedContainer className="bg-green-500">
      <h1 className="recommended__header">Recommended Blogs</h1>

      <ul className="recommended__list">
        {recommendedBlogs &&
          recommendedBlogs.map((blog) => (
            <li key={blog.id} className="recommended__item">
              <Link to={`/blog/${blog.slug}`}>
                {blog.title.length > 64
                  ? blog.title.slice(0, 64) + ".."
                  : blog.title}
              </Link>
            </li>
          ))}
      </ul>
    </RecommendedContainer>
  );
};

const RecommendedContainer = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;

  .recommended__header {
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1rem;
    text-align: center;
    border-bottom: 0.1rem solid #eaeaea;
  }

  .recommended__list {
    padding: 1rem;

    .recommended__item {
      font-size: 1.4rem;
      font-weight: 500;
      padding: 0.8rem 0.4rem;
      border-bottom: 0.1rem solid #eaeaea;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  @media (max-width: 768px) {
    .recommended__header {
      font-size: 1.6rem;
    }

    .recommended__list {
      .recommended__item {
        font-size: 1.25rem;
      }
    }
  }
`;

export default RecomendedBlock;
