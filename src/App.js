import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneralLayout from "./utils/layouts/GeneralLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import CreateBlog from "./pages/Blog/CreateBlog";
import ReadBlog from "./pages/Blog/ReadBlog";
import { loadUserAsync } from "./features/auth/authAPI";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";
// import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<GeneralLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/blog/:id" element={<ReadBlog />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
