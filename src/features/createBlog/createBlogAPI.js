import {
  createBlogRequest,
  createBlogSuccess,
  createBlogFailure,
} from "./createBlogSlice";
import { auth, db, storage } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createBlogAsync = (blog) => async (dispatch) => {
  dispatch(createBlogRequest());

  try {
    const auther_uid = await auth.currentUser.uid;

    if (!auther_uid) {
      throw new Error("Can't create blog");
    }

    const title = blog.get("title");
    const description = blog.get("description");
    const content = blog.get("content");
    const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

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
      auther_uid,
      timestamp: Date.now(),
    });

    dispatch(createBlogSuccess("Blog created successfully"));
  } catch (error) {
    dispatch(createBlogFailure(error.message));
  }
};

// upload thumbnail to firebase storage
const uploadThumbnail = async (thumbnail) => {
  const thumbnailName = `${Date.now()}_${thumbnail.name}`;
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
