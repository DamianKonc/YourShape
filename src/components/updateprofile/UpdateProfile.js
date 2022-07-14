import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { auth } from "../../dataBase/firebase";
import { updatePassword, updateEmail } from "firebase/auth";
import "./updateprofile.scss";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== auth.currentUser.email) {
      updateEmail(user, emailRef.current.value);
    }
    if (passwordRef.current.value !== auth.currentUser.password) {
      updatePassword(user, passwordRef.current.value);
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
    <div className="wrapper">
      <Logo />
      <h2 className="UpdateProfile__header">Update profile</h2>
      {error && <div>{error}</div>}
      <form className="updateprofile__form" onSubmit={handleSubmit}>
        <label className="updateprofile__form-el">
          Email
          <input
            className="updateprofile__form-el-input"
            id="email"
            ref={emailRef}
            required
            defaultValue={auth.currentUser.email}
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
        <Link className="link-element" to="/dashboard">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
