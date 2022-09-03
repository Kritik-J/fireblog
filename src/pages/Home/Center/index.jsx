import React from "react";
import { BlogBlock, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAsync } from "../../../features/blog/blogAPI";
import { clearBlogsError } from "../../../features/blog/blogSlice";

const Center = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error, blogsNotFound } = useSelector(
    (state) => state.blog
  );

  React.useEffect(() => {
    if (error) {
      dispatch(clearBlogsError());
    }

    if (!blogsNotFound) {
      if (blogs.length === 0) {
        dispatch(getBlogsAsync());
      }
    }
  }, [dispatch, error, blogs, blogsNotFound]);

  return (
    <>
      {loading && <Loader />}
      <div className="h-full relative ">
        {blogsNotFound ? (
          <div className="text-center text-2xl font-bold text-gray-500 pt-8">
            No blogs found
          </div>
        ) : (
          <>
            {blogs &&
              blogs.map((blog) => <BlogBlock key={blog.id} blog={blog} />)}
          </>
        )}
      </div>
    </>
  );
};

export default Center;
