import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  getBlogs,
  getBlogsFailure,
  getBlogsSuccess,
  readBlog,
  readBlogFailure,
  readBlogSuccess,
} from "./blogSlice";

export const getBlogsAsync = () => async (dispatch) => {
  dispatch(getBlogs());
  try {
    const blogs = await getDocs(collection(db, "blogs"));

    const blogsData = blogs.docs.map(async (blog) => {
      const author = await getDoc(doc(db, "users", blog.data().author.id));

      blog = {
        ...blog.data(),
        id: blog.id,
        author: author.data(),
      };

      return blog;
    });

    const blogsList = await Promise.all(blogsData);

    dispatch(getBlogsSuccess(blogsList));
  } catch (error) {
    console.log(error);
    dispatch(getBlogsFailure(error.message));
  }
};

export const getBlogAsync = (slug) => async (dispatch) => {
  dispatch(readBlog());

  try {
    // find blog with slug field equal to slug

    const blogRef = collection(db, "blogs");

    const blogQuery = await query(blogRef, where("slug", "==", slug), limit(1));

    const blogs = await getDocs(blogQuery);

    const blogData = blogs.docs.map(async (blog) => {
      const author = await getDoc(doc(db, "users", blog.data().author.id));

      blog = {
        ...blog.data(),
        id: blog.id,
        author: author.data(),
      };

      return blog;
    });

    const blog = await Promise.all(blogData);

    dispatch(readBlogSuccess(blog[0]));
  } catch (error) {
    dispatch(readBlogFailure(error.message));
  }
};
