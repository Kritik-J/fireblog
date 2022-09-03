import React from "react";
import { BlogBlock, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAsync } from "../../../features/blog/blogAPI";
import { clearBlogsError } from "../../../features/blog/blogSlice";

const Center = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const [isBlogEmpty, setIsBlogEmpty] = React.useState(false);

  React.useEffect(() => {
    if (error === "No blogs found") {
      setIsBlogEmpty(true);
      dispatch(clearBlogsError());
    }

    if (!isBlogEmpty) {
      if (blogs.length === 0) {
        dispatch(getBlogsAsync());
      }
    }
  }, [dispatch, error, blogs, isBlogEmpty]);

  return (
    <>
      {loading && <Loader />}
      <div className="h-full relative ">
        {blogs && blogs.map((blog) => <BlogBlock key={blog.id} blog={blog} />)}
      </div>
    </>
  );
};

export default Center;
