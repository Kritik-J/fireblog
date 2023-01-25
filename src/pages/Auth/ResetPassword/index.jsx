import React from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync } from "../../../features/resetPassword/resetPasswordAPI";
import {
  clearMessage,
  clearError,
} from "../../../features/resetPassword/resetPasswordSlice";
import { Alert, Loader } from "../../../components";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const history = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.resetPassword
  );

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const oobCode = urlParams.get("oobCode");

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAsync(oobCode, password, confirmPassword));
    setPassword("");
    setConfirmPassword("");
  };

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
        history("/login");
      }, 3000);
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, message, dispatch, history]);

  return (
    <ResetPasswordScreen>
      <ResetPasswordContainer>
        {loading && <Loader position='absolute' radius='0.4rem 0.4rem 0 0' />}

        <form onSubmit={handleResetPassword} className='form'>
          <h1 className='form__title'>Reset Password</h1>

          <label className='form__label' htmlFor='password'>
            Password
          </label>
          <input
            className='form__input'
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className='form__label' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            className='form__input'
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className='form__button'>Reset</button>
        </form>

        {error && <Alert status='error'>{error}</Alert>}

        {message && <Alert status='success'>{message}</Alert>}
      </ResetPasswordContainer>
    </ResetPasswordScreen>
  );
};

const ResetPasswordScreen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  background-image: url("/images/bg.svg");
  background-size: "cover";
  background-repeat: "no-repeat";
  background-position: "center";

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ResetPasswordContainer = styled.div`
  width: 100%;
  max-width: 44rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  position: relative;

  .form {
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
  }

  .form__title {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--secondary);
  }

  .form__label {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .form__input {
    font-size: 1.6rem;
    padding: 0.4rem;
    border: 1px solid #000;
    border-radius: 0.4rem;
    margin-bottom: 1rem;
    outline: none;
  }

  .form__button {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 0.4rem;
    background-color: var(--secondary);
    color: #fff;

    &:hover {
      box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.2);
    }
  }

  .google__button {
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 4rem;
    padding: 0.6rem 1.2rem;
    width: 100%;
    border: 0.1rem solid #ccc;
    color: #3d3d3d;
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .form__title {
      font-size: 2rem;
    }

    .form__label,
    .form__input,
    .form__button {
      font-size: 1.4rem;
    }
  }
`;

export default ResetPassword;
