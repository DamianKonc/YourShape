import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import "./forgotpassword.scss";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
  }

  return (
    <div className="wrapper">
      <Logo />
      <h2 className="forgotPassword__header">Reset password</h2>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <form className="forgotPassword__form" onSubmit={handleSubmit}>
        <label className="forgotPassword__form-label">
          Email
          <input
            className="forgotPassword__form-input"
            id="email"
            ref={emailRef}
            required
            placeholder="Email"
          />
        </label>

        <button
          className="forgotPassword__form-btn"
          type="submit"
          disabled={loading}
        >
          Reset Password
        </button>
      </form>
      <Link className="link-element" to="/">
        Login
      </Link>
      <div className="fortotPassword__signUp">
        <p className="forgotPassword__createAcc"> Need an account?</p>
        <Link className="link-element" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
