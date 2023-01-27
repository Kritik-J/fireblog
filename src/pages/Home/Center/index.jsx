import React from "react";
import { LazyBlogBlock, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAsync } from "../../../features/blog/blogAPI";
import { clearBlogsError } from "../../../features/blog/blogSlice";
import { Suspense, lazy } from "react";

const Center = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error, blogsNotFound } = useSelector(
    (state) => state.blog
  );

  const BlogBlock = lazy(() => import("../../../components/blocks/BlogBlock"));

  React.useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      dispatch(clearBlogsError());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className='h-full relative px-[2rem] sm:px-0'>
        {blogsNotFound ? (
          <div className='text-center text-2xl font-bold text-gray-500 pt-8'>
            No blogs found
          </div>
        ) : (
          <>
            {blogs &&
              blogs.map((blog) => (
                <Suspense key={blog.id} fallback={<LazyBlogBlock />}>
                  <BlogBlock blog={blog} />
                </Suspense>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default Center;
