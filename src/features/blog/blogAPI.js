import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getBlogs, getBlogsFailure, getBlogsSuccess } from "./blogSlice";

export const getBlogsAsync = () => async (dispatch) => {
  dispatch(getBlogs());
  try {
    const blogRef = await collection(db, "blogs");
    const blogs = await getDocs(blogRef);

    let blogsArray = [];

    await blogs.forEach(async (blog) => {});

    console.log(blogsArray);
    dispatch(getBlogsSuccess(blogsArray));
  } catch (error) {
    console.log(error);
    dispatch(getBlogsFailure(error.message));
  }
};
