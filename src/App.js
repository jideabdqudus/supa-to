import "./App.css";
import Home from "./pages/Home.js";
import Update from "./pages/Update.js";
import SignUp from "./pages/SignUp.js";
import Create from "./pages/Create.js";
import SignIn from "./pages/SignIn.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Todo</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/create" element={<Create />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
