import {
  createBlogRequest,
  createBlogSuccess,
  createBlogFailure,
} from "./createBlogSlice";
import { auth, db, storage } from "../../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createBlogAsync = (blog) => async (dispatch) => {
  dispatch(createBlogRequest());

  try {
    const author_uid = auth.currentUser.uid;

    if (!author_uid) {
      throw new Error("Can't create blog");
    }
    const authorRef = doc(db, `users/${author_uid}`);

    const title = blog.get("title");
    const description = blog.get("description");
    const content = blog.get("content");
    // remove all special characters and spaces from title
    const slug =
      title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() + "-" + Date.now();

    const thumbnailURL = await uploadThumbnail(blog.get("thumbnail"));

    if (!thumbnailURL) {
      throw new Error("Can't create blog");
    }

    // create new blog in firebase firestore
    const blogRef = doc(collection(db, "blogs"));

    await setDoc(blogRef, {
      slug,
      title,
      description,
      content,
      thumbnailURL,
      author: authorRef,
      timestamp: Timestamp.fromDate(new Date()),
    });

    dispatch(createBlogSuccess("Blog created successfully"));
  } catch (error) {
    dispatch(createBlogFailure(error.message));
  }
};

// upload thumbnail to firebase storage
const uploadThumbnail = async (thumbnail) => {
  const thumbnailName = `${thumbnail.name
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase()}-${Date.now()}`;

  const fileRef = ref(storage, `thumbnails/${thumbnailName}`);

  const thumbnailRef = await uploadBytes(fileRef, thumbnail)
    .then((snapshot) => {
      return snapshot.ref.fullPath;
    })
    .catch((error) => {
      return null;
    });

  if (!thumbnailRef) {
    return null;
  } else {
    const url = ref(storage, thumbnailRef);
    return await getDownloadURL(url);
  }
};
