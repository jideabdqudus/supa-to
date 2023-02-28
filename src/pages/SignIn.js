import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import supabase from "../config/supabaseClient";

const SignIn = ({ user }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);

  const { email, password } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      navigate("/");
      return;
    } else {
      console.log(error);
      setFormError("There is an error with the data you submitted");
      return;
    }
  };

  async function signInWithGithub() {
    /* authenticate with GitHub */
    await supabase.auth?.signIn({
      provider: "github",
    });
  }
  
  async function signOut() {
    /* sign the user out */
    const { error } = await supabase.auth?.signOut();
    if (error) {
      console.log("Error Logging Out");
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log("else");
    }
  }

  console.log(user, 'user')

  return (
    <div className="sign-in">
      {user ? (
        <form>
          <h1>Hello, {user?.email}</h1>
          <button onClick={signOut}>Log out</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button>Login</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
