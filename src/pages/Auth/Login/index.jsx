import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import GoogleIcon from "../../../assets/icons/google.svg";
import { googleAuthAsync, loginAsync } from "../../../features/auth/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../../../features/auth/authSlice";
import { Alert, Loader } from "../../../components";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginAsync(email, password));
  };

  const handleGoogleAuth = () => {
    dispatch(googleAuthAsync());
    setEmail("");
    setPassword("");
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
    <LoginScreen
      style={{
        backgroundImage: `url(${require("../../../assets/images/bg2.jpg")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <LoginContainer>
        {loading && <Loader position="absolute" radius="0.4rem 0.4rem 0 0" />}

        <form onSubmit={handleLogin} className="form">
          <h1 className="form__title">Login</h1>

          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form__button">Login</button>
        </form>

        <div className="flex items-center my-[1rem] before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5">
          <p className="text-center text-[1.4rem] sm:text-[1.2rem] font-semibold mx-[1rem] mb-0">
            OR
          </p>
        </div>

        <button className="google__button" onClick={handleGoogleAuth}>
          <img src={GoogleIcon} alt="google-icon" />
          Continue with Google
        </button>

        <div className="form__links">
          <Link to="/register">Not registered yet?</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        {error && <Alert status="error">{error}</Alert>}

        {message && <Alert status="success">{message}</Alert>}
      </LoginContainer>
    </LoginScreen>
  );
};

const LoginScreen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const LoginContainer = styled.div`
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
    .form__button,
    .form__links a {
      font-size: 1.4rem;
    }

    .google__button {
      font-size: 1.4rem;

      img {
        width: 1.8rem;
      }
    }
  }
`;

export default Login;
