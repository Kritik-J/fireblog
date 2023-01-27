import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { createBlogAsync } from "../../../features/createBlog/createBlogAPI";
import { Alert, Editor, Loader, RenderRichText } from "../../../components";
import {
  clearError,
  clearMessage,
} from "../../../features/createBlog/createBlogSlice";

const CreateBlog = () => {
  const [title, setTitle] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  const [content, setContent] = React.useState("");

  const thumbnailRef = React.useRef(null);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.createBlog);

  const handleSubmit = (e) => {
    const blogData = new FormData();

    blogData.append("title", title);
    blogData.append("thumbnail", thumbnail);
    blogData.append("content", content);

    e.preventDefault();
    dispatch(createBlogAsync(blogData));

    setTitle("");
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
        {loading && <Loader position='absolute' radius='0.4rem 0.4rem 0 0' />}

        <h1 className='form__title'>Create Blog</h1>

        <form className='form' onSubmit={handleSubmit}>
          <label className='form__label'>Thumbnail</label>

          <label htmlFor='dropzone_image' className='w-full'>
            <div
              className={`file__input__container relative
    ${thumbnail ? "file__input__container--active" : ""}`}
            >
              <p className='file__input__text'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>

              <input
                id='dropzone_image'
                type='file'
                className='absolute w-full h-full opacity-0 cursor-pointer'
                name='image'
                accept='image/*'
                required
                onChange={(e) => setThumbnail(e.target.files[0])}
                ref={thumbnailRef}
              />

              {thumbnail && (
                <p className='mt-3 text-gray-800 md:text-lg text-xl'>
                  Selected file:{" "}
                  {thumbnail.name.length > 20
                    ? thumbnail.name.slice(0, 20) + "..."
                    : thumbnail.name}
                </p>
              )}
            </div>
          </label>

          <label htmlFor='title' className='form__label'>
            Title
          </label>
          <input
            type='text'
            id='title'
            className='form__input'
            required
            minLength='32'
            maxLength='100'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor='content' className='form__label'>
            Content
          </label>

          {/* rich text editor */}
          <div className='mb-[1rem] border-[0.1rem] border-black rounded-[0.4rem]'>
            <Editor content={content} setContent={setContent} />
          </div>

          <button type='submit' className='form__button'>
            Create
          </button>
        </form>

        {error && <Alert status='error'>{error}</Alert>}

        {message && <Alert status='success'>{message}</Alert>}
      </CreateBlogContainer>

      <BlogPreviewContainer>
        <h1 className='preview__title'>Preview</h1>

        <div className='preview__thumbnail'>
          <img
            src={
              thumbnail
                ? URL.createObjectURL(thumbnail)
                : "https://via.placeholder.com/200x200"
            }
            alt='thumbnail'
          />
        </div>
        <div className='preview__content'>
          <h2 className='preview__content__title'>
            {title ? title : "Title goes here ..."}
          </h2>

          <div className='preview__content__description'>
            {content ? (
              <RenderRichText content={content} />
            ) : (
              <p>Content goes here ...</p>
            )}
          </div>
        </div>
      </BlogPreviewContainer>
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
  grid-gap: 4rem;

  @media (max-width: 768px) {
    padding: 8rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;
  }
`;

const CreateBlogContainer = styled.div`
  padding: 2rem;
  border-radius: 0.4rem;
  width: 100%;
  height: fit-content;
  background-color: #fff;
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
    font-weight: 600;
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
    background-color: transparent;
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
    padding: 0;
    padding-bottom: 4rem;
    background: transparent;
    box-shadow: none;
    border-bottom: 0.1rem solid #eaeaea;

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

const BlogPreviewContainer = styled.div`
  width: 100%;

  .preview__title {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--secondary);
  }

  .preview__thumbnail {
    width: 100%;
    height: 24rem;
    border-radius: 0.4rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .preview__content {
    margin-top: 1rem;
    width: 100%;
    overflow: hidden;

    .preview__content__title {
      font-size: 2rem;
      font-weight: 600;
    }

    .preview__content__description {
      margin-top: 1rem;

      p {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 768px) {
    .preview__title {
      font-size: 2rem;
    }

    .preview__content {
      .preview__content__title {
        font-size: 1.8rem;
      }

      .preview__content__description {
        p {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default CreateBlog;
