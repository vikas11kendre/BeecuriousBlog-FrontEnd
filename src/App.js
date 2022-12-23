import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Box } from "@mui/material";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import { getTrendingPosts } from "./actions/posts";
import loading from "./images/loading1.gif";
const Auth = lazy(() => import("./components/Auth/Auth"));

const PostDetails = lazy(() => import("./components/PostDetails/PostDetails"));
const Creator = lazy(() => import("./components/Creator/Creator"));
const Catageory = lazy(() => import("./components/Catageory/Catageory"));

const Home = lazy(() => import("./components/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  dispatch(getTrendingPosts());
  return (
    <Router>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box component="img" src={loading} sx={{ width: "80%" }} />
          </Box>
        }
      >
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
                path={"/auth"}
                action={() =>
                  !user ? <Navigate to="/posts" replace /> : <Auth />
                }
                element={!user ? <Auth /> : <Home />}
              />
            </Routes>
          </Container>
        </GoogleOAuthProvider>
      </Suspense>
    </Router>
  );
};

export default App;
