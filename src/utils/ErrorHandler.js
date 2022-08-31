// firebase error handler
export const firebaseErrorHandler = (error) => {
  const { code } = error;
  if (code === "auth/user-not-found") {
    return {
      code,
      message: "User not found",
    };
  }

  if (code === "auth/wrong-password") {
    return {
      code,
      message: "Wrong password",
    };
  }

  if (code === "auth/email-already-in-use") {
    return {
      code,
      message: "Email already in use",
    };
  }

  if (code === "auth/invalid-email") {
    return {
      code,
      message: "Invalid email",
    };
  }

  if (code === "auth/user-disabled") {
    return {
      code,
      message: "User disabled",
    };
  }

  if (code === "auth/user-not-found") {
    return {
      code,
      message: "User not found",
    };
  }

  return {
    code,
    message: "Unknown error",
  };
};
