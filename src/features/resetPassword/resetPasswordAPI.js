import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "./resetPasswordSlice";

export const forgotPasswordAsync =
  (email, confirmEmail) => async (dispatch) => {
    dispatch(forgotPassword());

    try {
      if (email !== confirmEmail) {
        throw new Error("Email and confirm email must match");
      }

      await sendPasswordResetEmail(auth, email);

      dispatch(forgotPasswordSuccess({ message: "Password reset email sent" }));
    } catch (error) {
      dispatch(forgotPasswordFailure(error.message));
    }
  };

export const resetPasswordAsync =
  (oobCode, password, confirmPassword) => async (dispatch) => {
    dispatch(resetPassword());

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      } else if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      } else {
        await confirmPasswordReset(auth, oobCode, password);

        dispatch(
          resetPasswordSuccess({ message: "Password reset successful" })
        );
      }
    } catch (error) {
      dispatch(resetPasswordFailure(error.message));
    }
  };
