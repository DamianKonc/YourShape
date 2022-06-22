import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input id="email" ref={emailRef} required placeholder="Email" />
        </label>
        <label>
          Password
          <input
            id="password"
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
        </label>
        <label>
          Password
          <input
            id="checkPassword"
            type="password"
            ref={passwordConfirmationRef}
            required
            placeholder="Check password"
          />
        </label>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Allready have an account? <Link to="/login">Log In</Link>{" "}
      </div>
    </>
  );
};

export default SignUp;
