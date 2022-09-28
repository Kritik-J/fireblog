import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
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
    const blogsDoc = await getDocs(collection(db, "blogs"));

    const blogsData = blogsDoc.docs.map(async (blog) => {
      const author = await getDoc(doc(db, "users", blog.data().author.id));
      
      blog = {
        ...blog.data(),
        id: blog.id,
        author: author.data(),
      };

      return blog;
    });

    
    const recommendedBlogsDoc = await getDocs(
      query(collection(db, "blogs"), 
        orderBy("timestamp", "asc"),
        limit(3)
      )
    )
    const blogs = await Promise.all(blogsData);

    const recommendedBlogsData = recommendedBlogsDoc.docs.map(async (blog) => {

      blog = {
        title: blog.data().title,
        slug: blog.data().slug,
        id: blog.id,
      }

      return blog;
    });

    const recommendedBlogs = await Promise.all(recommendedBlogsData);



    dispatch(getBlogsSuccess({ blogs, recommendedBlogs }));

    if (blogs.length === 0) {
      throw new Error("No blogs found");
    }
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

    if (blog.length === 0) {
      throw new Error("Blog not found");
    }

    dispatch(readBlogSuccess(blog[0]));
  } catch (error) {
    dispatch(readBlogFailure(error.message));
  }
};
