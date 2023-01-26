import React, { Suspense, lazy } from "react";
import loading from "./images/loading1.gif";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "./components/Footer/Footer";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Container = lazy(() => import("@mui/material/Container"));
const PostDetails = lazy(() => import("./components/PostDetails/PostDetails"));
const Creator = lazy(() => import("./components/Creator/Creator"));
const Catageory = lazy(() => import("./components/Catageory/Catageory"));
const CreatePost = lazy(() => import("./components/CreatePost/CreatePost"));
const Home = lazy(() => import("./components/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img alt="loader" src={loading} style={{ width: "80%" }} />
          </div>
        }
      >
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />

              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/posts" element={<Home />} />
              <Route path="/posts/search" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path={"/creators/:name"} element={<Creator />} />
              <Route path={"/catageory/:name"} element={<Catageory />} />
              <Route path="/auth" element={<Auth />}></Route>
            </Routes>
            <Footer />
          </Container>
        </GoogleOAuthProvider>
      </Suspense>
    </Router>
  );
};

export default App;
