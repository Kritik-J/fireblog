import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Alert, Loader } from "../../../components";
import { forgotPasswordAsync } from "../../../features/resetPassword/resetPasswordAPI";
import {
  clearError,
  clearMessage,
} from "../../../features/resetPassword/resetPasswordSlice";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");

  const history = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.resetPassword
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAsync(email, confirmEmail));
    setEmail("");
    setConfirmEmail("");
  };

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
        history("/");
      }, 3000);
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, message, dispatch, history]);

  return (
    <ForgotPasswordScreen>
      <ForgotPasswordContainer>
        {loading && <Loader position='absolute' radius='0.4rem 0.4rem 0 0' />}

        <form onSubmit={handleForgotPassword} className='form'>
          <h1 className='form__title'>Forgot Password</h1>
          <label className='form__label' htmlFor='email'>
            Email
          </label>
          <input
            className='form__input'
            type='email'
            name='email'
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className='form__label' htmlFor='confirmEmail'>
            Confirm Email
          </label>
          <input
            className='form__input'
            type='email'
            name='confirmEmail'
            id='confirmEmail'
            required
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />

          <button className='form__button'>Send</button>
        </form>

        <div className='form__links'>
          <Link to='/register'>Not registered yet?</Link>
          <Link to='/login'>Already registered?</Link>
        </div>

        {error && <Alert status='error'>{error}</Alert>}

        {message && <Alert status='info'>{message}</Alert>}
      </ForgotPasswordContainer>
    </ForgotPasswordScreen>
  );
};

const ForgotPasswordScreen = styled.div`
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

const ForgotPasswordContainer = styled.div`
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

  .form__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;

    a {
      font-size: 1.6rem;
      font-weight: 600;
      color: var(--secondary);

      &:hover {
        text-decoration: underline;
      }
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
    .form__button,
    .form__links a {
      font-size: 1.4rem;
    }
  }
`;

export default ForgotPassword;
