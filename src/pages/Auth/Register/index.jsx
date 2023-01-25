import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import GoogleIcon from "../../../assets/icons/google.svg";

import { useDispatch, useSelector } from "react-redux";
import { googleAuthAsync, registerAsync } from "../../../features/auth/authAPI";
import { clearError, clearMessage } from "../../../features/auth/authSlice";
import { Alert, Loader } from "../../../components";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const history = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerAsync(name, email, password, passwordConfirm));
  };

  const handleGoogleAuth = () => {
    dispatch(googleAuthAsync());
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
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
    <RegisterScreen>
      <RegisterContainer>
        {loading && <Loader position='absolute' radius='0.4rem 0.4rem 0 0' />}

        <form onSubmit={handleRegister} className='form'>
          <h1 className='form__title'>Register</h1>

          <label className='form__label' htmlFor='name'>
            Name
          </label>
          <input
            className='form__input'
            type='text'
            name='name'
            required
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className='form__label' htmlFor='email'>
            Email
          </label>
          <input
            className='form__input'
            type='email'
            name='email'
            required
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button className='form__button'>Register</button>
        </form>

        <div className='flex items-center my-[1rem] before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5'>
          <p className='text-center text-[1.4rem] sm:text-[1.2rem] font-semibold mx-[1rem] mb-0'>
            OR
          </p>
        </div>

        <button className='google__button' onClick={handleGoogleAuth}>
          <img src={GoogleIcon} alt='google-icon' />
          Continue with Google
        </button>

        <div className='form__links'>
          <p className='form__link'>
            <Link to='/login'>Already registered?</Link>
          </p>

          <p className='form__link'>
            By registering, you agree to our{" "}
            <Link to='/terms'>Terms of Service</Link> and{" "}
            <Link to='/privacy'>Privacy Policy</Link>
          </p>
        </div>

        {error && <Alert status='error'>{error}</Alert>}

        {message && <Alert status='success'>{message}</Alert>}
      </RegisterContainer>
    </RegisterScreen>
  );
};

const RegisterScreen = styled.div`
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

const RegisterContainer = styled.div`
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
    flex-direction: column;
    align-items: center;
    margin-top: 2.5rem;

    .form__link {
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      margin-top: 1rem;

      a {
        color: var(--secondary);

        &:hover {
          text-decoration: underline;
        }
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
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 2.4rem;
      margin-right: 1rem;
    }
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

    .form__links {
      .form__link {
        font-size: 1.25rem;
        margin-top: 0.4rem;
      }
    }

    .google__button {
      font-size: 1.4rem;

      img {
        width: 1.8rem;
      }
    }
  }
`;

export default Register;
