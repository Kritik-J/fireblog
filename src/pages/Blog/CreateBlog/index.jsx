import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { createBlogAsync } from "../../../features/createBlog/createBlogAPI";
import { Alert, Loader } from "../../../components";
import {
  clearError,
  clearMessage,
} from "../../../features/createBlog/createBlogSlice";

const CreateBlog = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [content, setContent] = React.useState("");
  const thumbnailRef = React.useRef(null);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.createBlog);

  const handleSubmit = (e) => {
    const blogData = new FormData();

    blogData.append("title", title);
    blogData.append("description", description);
    blogData.append("thumbnail", thumbnail);
    blogData.append("content", content);

    e.preventDefault();
    dispatch(createBlogAsync(blogData));

    setTitle("");
    setDescription("");
    setThumbnail("");
    setContent("");
    thumbnailRef.current.value = "";
  };

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, message, dispatch]);

  return (
    <CreateBlogScreen>
      <CreateBlogContainer>
        {loading && <Loader position="absolute" radius="0.4rem 0.4rem 0 0" />}

        <h1 className="form__title">Create Blog</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="form__label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form__input"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description" className="form__label">
            Description
          </label>
          <textarea
            id="description"
            className="form__input"
            rows="3"
            cols="50"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="form__label">Thumbnail</label>

          <label htmlFor="dropzone-image" className="w-full">
            <div
              className={`file__input__container 
              ${thumbnail ? "file__input__container--active" : ""}`}
            >
              {/* <FontAwesomeIcon icon={faUpload} className="file__input__icon" /> */}

              <p className="file__input__text">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>

            <input
              id="dropzone-image"
              type="file"
              className="hidden"
              name="image"
              accept="image/*"
              required
              onChange={(e) => setThumbnail(e.target.files[0])}
              ref={thumbnailRef}
            />
          </label>
          {/* rich text editor */}
          <label htmlFor="content" className="form__label">
            Content
          </label>

          <textarea
            id="content"
            className="form__input"
            rows="3"
            cols="50"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" className="form__button">
            Create
          </button>
        </form>

        {error && <Alert status="error">{error}</Alert>}

        {message && <Alert status="success">{message}</Alert>}
      </CreateBlogContainer>

      {/* <HelperContainer>
        <h2 className="helper__title">Learn how to create a blog post</h2>
      </HelperContainer> */}
    </CreateBlogScreen>
  );
};

const CreateBlogScreen = styled.div`
  min-height: 100vh;
  padding: 8rem 4rem 2rem;
  max-width: 144rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 2rem;

  @media (max-width: 768px) {
    padding: 8rem 2rem 2rem;
    display: flex;
    flex-direction: column;
  }
`;

const CreateBlogContainer = styled.div`
  padding: 2rem;
  border-radius: 0.4rem;
  width: 100%;
  height: fit-content;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  position: relative;

  .form {
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
  }

  .form__title {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--secondary);
  }

  .form__label {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .form__input {
    font-size: 1.6rem;
    padding: 0.4rem;
    border: 1px solid #000;
    border-radius: 0.4rem;
    margin-bottom: 1rem;
    outline: none;
    resize: vertical;
  }

  .file__input__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.1rem dashed;
    border-radius: 0.4rem;
    padding: 1rem;
    width: 100%;
    margin-bottom: 1rem;

    &:hover {
      background-color: #eaeaea;
      cursor: pointer;
    }
  }

  .file__input__container--active {
    background-color: #eaeaea;
  }

  .file__input__icon {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }

  .file__input__text {
    font-size: 1.6rem;
  }

  .form__button {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 0.4rem;
    background-color: var(--secondary);
    color: #fff;
    width: 12rem;

    &:hover {
      box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    .form__title {
      font-size: 2rem;
    }

    .form__label,
    .form__input,
    .form__button,
    .file__input__text {
      font-size: 1.4rem;
    }
  }
`;

// const HelperContainer = styled.div`
//   .helper__title {
//     font-size: 2rem;
//     font-weight: 700;
//     margin-bottom: 2rem;
//     color: var(--secondary);
//   }
// `;

export default CreateBlog;
