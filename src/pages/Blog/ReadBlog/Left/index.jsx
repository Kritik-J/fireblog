import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../../../components";
import { getBlogAsync } from "../../../../features/blog/blogAPI";
import BlogContainer from "./BlogContainer";

const Left = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { readBlogLoading, readBlog, readBlogNotFound } = useSelector(
    (state) => state.blog
  );

  React.useEffect(() => {
    if (!readBlog || readBlog.slug !== id) {
      dispatch(getBlogAsync(id));
    }
  }, [dispatch, id, readBlog]);

  return (
    <div className="h-full relative">
      {readBlogLoading ? (
        <Loader />
      ) : (
        <>
          {readBlogNotFound ? (
            <div className="text-center text-2xl font-bold text-gray-500">
              Blog not found
            </div>
          ) : (
            <>{readBlog && <BlogContainer blog={readBlog} />}</>
          )}
        </>
      )}
    </div>
  );
};

export default Left;
