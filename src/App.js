import "./App.css";
import Home from "./pages/Home.js";
import Update from "./pages/Update.js";
import SignUp from "./pages/SignUp.js";
import Create from "./pages/Create.js";
import SignIn from "./pages/SignIn.js";
import supabase from "./config/supabaseClient";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }
  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  return (
    <BrowserRouter>
      {user ? (
        <nav>
          <h1>Supa Todo</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/sign-in">Authenticate</Link>
        </nav>
      ) : (
        <nav>
          <h1>Supa Todo</h1>
          <Link to="/sign-in">Authenticate</Link>
          <Link to="/sign-up">Sign-up</Link>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/create" element={<Create />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
