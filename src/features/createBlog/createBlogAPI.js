import {
  createBlogRequest,
  createBlogSuccess,
  createBlogFailure,
} from "./createBlogSlice";
import { auth, db, storage } from "../../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import generateSlug from "../../utils/generateSlug";

export const createBlogAsync = (blog) => async (dispatch) => {
  dispatch(createBlogRequest());

  try {
    const author_uid = auth.currentUser.uid;

    if (!author_uid) {
      throw new Error("Can't create blog");
    }
    const authorRef = doc(db, `users/${author_uid}`);

    const title = blog.get("title");
    const content = blog.get("content");
    const thumbnail = blog.get("thumbnail");
    const slug = generateSlug(title);

    const thumbnailURL = await uploadThumbnail(thumbnail);

    if (!thumbnailURL) {
      throw new Error("Can't create blog");
    }

    const updatedContent = await findAndUploadImages(content, slug);

    // create new blog in firebase firestore

    const blogRef = doc(collection(db, "blogs"));

    await setDoc(blogRef, {
      slug,
      title,
      content: updatedContent,
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
  const thumbnailName = generateSlug(thumbnail.name);

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

const findAndUploadImages = async (content, slug) => {
  let newContent = content;

  const regex = /<img[^>]+src="([^">]+)"/g;
  let images = content.match(regex);

  if (images) {
    const promises = images.map(async (imgTag, index) => {
      const src = imgTag.match(/src="([^"]+)"/)[1];

      const blob = await fetch(src).then((r) => r.blob());

      const file = new File([blob], `image.${blob.type.split("/")[1]}`, {
        type: blob.type,
        lastModified: Date.now(),
      });

      const imgName = generateSlug(
        slug + index * Math.floor(Math.random() * 1000)
      );

      const fileRef = ref(storage, `images/${imgName}`);

      const imgRef = await uploadBytes(fileRef, file)
        .then((snapshot) => {
          return snapshot.ref.fullPath;
        })
        .catch((error) => {
          return null;
        });

      if (!imgRef) {
        throw new Error("Can't create blog");
      } else {
        const url = ref(storage, imgRef);
        const downloadURL = await getDownloadURL(url);

        const newImgTag = imgTag.replace(src, downloadURL);

        newContent = newContent.replace(imgTag, newImgTag);
      }
    });

    await Promise.all(promises);
  }

  return newContent;
};
