import React from "react";
import styled from "styled-components/macro";

const RenderRichText = ({ content }) => {
  return (
    <RenderBody>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </RenderBody>
  );
};

export default RenderRichText;

const RenderBody = styled.div`
  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  h5 {
    font-size: 1.4rem;
  }

  h6 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
  }

  a {
    font-size: 1.6rem;
    color: var(--secondary);
    transition: all 0.2s ease-in-out;
    white-space: pre-wrap;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0.4rem;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    aspect-ratio: 16/9;
    border-radius: 0.4rem;
  }

  blockquote {
    font-size: 1.6rem;
    font-style: italic;
    border-left: 0.4rem solid var(--secondary);
    margin-left: 0;
    background-color: #e5e5e5;
    padding: 0.5rem 1rem;
    padding-left: 1rem;
    border-radius: 0.4rem;
  }

  ul {
    list-style: disc;
    /* list-style-position: inside; */
    margin-left: 2.5rem;
  }

  ol {
    list-style: decimal;
    /* list-style-position: inside; */
    margin-left: 2.5rem;
  }

  li {
    margin: 0.5rem 0;
    padding-left: 1rem;
  }

  ul,
  ol {
    font-size: 1.6rem;
    line-height: 1.5;
  }

  pre,
  code {
    font-size: 1.4rem;
    background-color: black;
    color: white;
    border-radius: 0.4rem;
    padding: 1rem;

    white-space: pre-wrap;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.6rem;
    }

    h4 {
      font-size: 1.4rem;
    }

    h5 {
      font-size: 1.25rem;
    }

    h6 {
      font-size: 1.125rem;
    }

    p,
    a,
    blockquote,
    ul,
    ol {
      font-size: 1.4rem;
    }

    pre,
    code {
      font-size: 1.25rem;
    }
  }
`;
