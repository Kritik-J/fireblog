import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getBlogs, getBlogsFailure, getBlogsSuccess } from "./blogSlice";

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
