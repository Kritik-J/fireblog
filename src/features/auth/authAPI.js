import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
  googleAuth,
  googleAuthFailure,
  googleAuthSuccess,
} from "./authSlice";

import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Buffer } from "buffer";

export const registerAsync =
  (name, email, password, confirmPassword) => async (dispatch) => {
    dispatch(register());

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      } else if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      } else {
        const isUserExists = await fetchSignInMethodsForEmail(auth, email);

        if (isUserExists.length > 0) {
          throw new Error("User already exists");
        }

        const avatar = await generateAvatar(name);

        const avatarURL = await uploadAvatar(avatar, name);

        if (!avatarURL) {
          throw new Error("Can't register user");
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userRef = await doc(db, "users", `${user.uid}`);

        await setDoc(userRef, {
          name: name,
          email: email,
          role: "user",
          photoURL: avatarURL,
          timestamp: Timestamp.fromDate(new Date()),
        });

        const userData = await getDoc(userRef);

        dispatch(
          registerSuccess({
            user: userData.data(),
            message: "Registration successful",
          })
        );
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

export const loginAsync = (email, password) => async (dispatch) => {
  dispatch(login());
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const userRef = await doc(db, "users", `${user.uid}`);

    const userData = await getDoc(userRef);

    dispatch(
      loginSuccess({ user: userData.data(), message: "Login successful" })
    );
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const loadUserAsync = () => async (dispatch) => {
  dispatch(loadUser());
  await onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        throw new Error("Login required");
      }

      const userRef = await doc(db, "users", `${user.uid}`);

      const userData = await getDoc(userRef);

      dispatch(loadUserSuccess({ user: userData.data() }));
    } catch (error) {
      dispatch(loadUserFailure());
    }
  });
};

export const logoutAsync = () => async (dispatch) => {
  dispatch(logout());
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};

export const googleAuthAsync = () => async (dispatch) => {
  dispatch(googleAuth());
  try {
    // check if user with this email already exists

    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);

    const userRef = await doc(db, "users", `${user.uid}`);
    const isUserExists = await getDoc(userRef);

    if (!isUserExists.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        role: "user",
        photoURL: user.photoURL,
        timestamp: Timestamp.fromDate(new Date()),
      });
    }

    const userData = await getDoc(userRef);

    dispatch(
      googleAuthSuccess({
        user: userData.data(),
        message: "Registration successful",
      })
    );
  } catch (error) {
    dispatch(googleAuthFailure(error.message));
  }
};

const generateAvatar = (name) => {
  const randomColorLevel = Math.floor(Math.random() * (9 - 3)) + 3;

  const randomNumber = Math.floor(Math.random() * (9999 - 10)) + 10;

  let seed = name.replace(/\s/g, "-");
  seed = seed.toLowerCase();
  seed = seed + "-" + randomNumber;

  let svg = createAvatar(style, {
    seed: seed,
    colorLevel: randomColorLevel * 100,
    size: 128,
    backgroundColor: "#fff",
  });

  return svg;
};

const uploadAvatar = async (file, name) => {
  const fileName = name.replace(/\s/g, "-") + "-" + Date.now();
  const fileRef = ref(storage, `avatars/${fileName}.svg`);

  const base64 = Buffer.from(file).toString("base64");
  const bytes = Buffer.from(base64, "base64");
  const blob = new Blob([bytes], { type: "image/svg+xml" });

  const avatarRef = await uploadBytes(fileRef, blob)
    .then((snapshot) => {
      return snapshot.ref.fullPath;
    })
    .catch((error) => {
      return null;
    });

  if (!avatarRef) {
    return null;
  } else {
    const url = ref(storage, avatarRef);
    return await getDownloadURL(url);
  }
};
