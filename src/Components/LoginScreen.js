import React, { useState } from "react";

const LoginScreen = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const submitFunction = (e) => {
    e.preventDefault();
    console.log(mail);
    console.log(password);
  };

  return (
    <>
      <form onSubmit={submitFunction}>
        <input onChange={(e) => setMail(e.target.value)} placeholder="Email" />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default LoginScreen;
