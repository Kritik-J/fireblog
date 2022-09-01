import React from "react";
import { BlogBlock, Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsAsync } from "../../../features/blog/blogAPI";

const Center = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  React.useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

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
