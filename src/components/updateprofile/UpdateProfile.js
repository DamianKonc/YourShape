import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import "./updateprofile.scss";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Logo />
      <h2>Update profile</h2>
      {error && <div>{error}</div>}
      <form className="updateprofile__form" onSubmit={handleSubmit}>
        <label className="updateprofile__form-el">
          Email
          <input
            className="updateprofile__form-el-input"
            id="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
            placeholder="Email"
          />
        </label>
        <label className="updateprofile__form-el">
          Password
          <input
            className="updateprofile__form-el-input"
            id="password"
            type="password"
            ref={passwordRef}
            required
            placeholder="Leave blank to keep the same"
          />
        </label>
        <label className="updateprofile__form-el">
          Password
          <input
            className="updateprofile__form-el-input"
            id="checkPassword"
            type="password"
            ref={passwordConfirmationRef}
            required
            placeholder="Leave blank to keep the same"
          />
        </label>
        <button
          className="updateprofile__form-btn"
          type="submit"
          disabled={loading}
        >
          Update
        </button>
      </form>
      <div>
        <Link className="link-element" to="/">
          Cancel
        </Link>{" "}
      </div>
    </>
  );
};

export default UpdateProfile;
