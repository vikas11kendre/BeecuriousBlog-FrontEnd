import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";
import Creator from "./components/Creator/Creator";
import Catageory from "./components/Catageory/Catageory";
import { useDispatch } from "react-redux";
import { getTrendingPosts } from "./actions/posts";
const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  dispatch(getTrendingPosts());
  return (
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path={"/creators/:name"} element={<Creator />} />
            <Route path={"/catageory/:name"} element={<Catageory />} />

            <Route
              path="/auth"
              action={() =>
                !user ? <Navigate to="/posts" replace /> : <Auth />
              }
              element={<Auth />}
            />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
      ;
    </Router>
  );
};

export default App;
