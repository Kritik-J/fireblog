import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const WidgetBlock = () => {
  const { recommendedBlogs } = useSelector((state) => state.blog);

  return (
    <WidgetContainer className="bg-green-500">
      <h1 className="widget__header">Recommended Blogs</h1>

      <ul className="widget__list">
        {recommendedBlogs &&
          recommendedBlogs.map((blog) => (
            <li key={blog.id} className="widget__item">
              <Link to={`/blog/${blog.slug}`}>
                {blog.title.length > 64
                  ? blog.title.slice(0, 64) + ".."
                  : blog.title}
              </Link>
            </li>
          ))}
      </ul>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;

  .widget__header {
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1rem;
    text-align: center;
    border-bottom: 0.1rem solid #eaeaea;
  }

  .widget__list {
    padding: 1rem;

    .widget__item {
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
    .widget__header {
      font-size: 1.6rem;
    }

    .widget__list {
      .widget__item {
        font-size: 1.25rem;
      }
    }
  }
`;

export default WidgetBlock;
