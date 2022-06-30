import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../dataBase/firebase";
import "./signup.scss";
import { updateCurrentUser } from "firebase/auth";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const nameRef = useRef();
  const birthDayRef = useRef();
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

    await addDoc(collection(db, "users"), {
      name: `${nameRef.current.value}`,
      birthDate: `${birthDayRef.current.value}`,
      email: `${emailRef.current.value}`,
      isAdmin: false,
    })
      .document()
      .collection("workout");
    setLoading(false);
  }

  return (
    <>
      <Logo />
      {error && <div>{error}</div>}
      <form className="signup__form" onSubmit={handleSubmit}>
        <label className="signup__form-el">
          Name
          <input
            className="signup__form-el-input"
            id="name"
            ref={nameRef}
            required
            placeholder="name"
          />
        </label>
        <label className="signup__form-el">
          Birth Date
          <input
            type="date"
            className="signup__form-el-input"
            id="bdate"
            ref={birthDayRef}
            required
            placeholder="Birthday date"
          />
        </label>
        <label className="signup__form-el">
          Email
          <input
            className="signup__form-el-input"
            id="email"
            ref={emailRef}
            required
            placeholder="Email"
            type="email"
          />
        </label>
        <label className="signup__form-el">
          Password
          <input
            className="signup__form-el-input"
            id="password"
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
        </label>
        <label className="signup__form-el">
          Password Confirmation
          <input
            className="signup__form-el-input"
            id="checkPassword"
            type="password"
            ref={passwordConfirmationRef}
            required
            placeholder="Check password"
          />
        </label>
        <button className="signup__form-btn" type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Allready have an account?{" "}
        <Link className="link-element" to="/">
          Log In
        </Link>{" "}
      </div>
    </>
  );
};

export default SignUp;
