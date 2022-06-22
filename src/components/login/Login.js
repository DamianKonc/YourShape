import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import "./login.scss";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      {error && <div>{error}</div>}
      <Logo />
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          Email
          <input
            className="form__label-input"
            id="email"
            ref={emailRef}
            required
            placeholder="Email"
          />
        </label>
        <label className="form__label">
          Password
          <input
            className="form__label-input"
            id="password"
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
        </label>

        <button className="form__btn" type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      <Link className="form__link" to="/forgot-password">
        Forgot Password?
      </Link>
      <div>
        Need an account?{" "}
        <Link className="form__link" to="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
