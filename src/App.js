import React from 'react'
import { Navigate, redirect } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Container} from "@mui/material"
// import Form from './components/Form/Form';
// import Posts from './components/Posts/Posts';
// import  {useDispatch} from 'react-redux';
// import { getPosts ,toggleForm } from './actions/posts';
import Navbar from './components/Navbar/Navbar';
// import * as dotenv from 'dotenv'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'))
  // dotenv.config();
  
  return (
    <Router>
    <GoogleOAuthProvider clientId="7871804931-ojsq919rrk4t72oga2hg349gp4c3jeds.apps.googleusercontent.com">
     <Container>
     <Navbar/>
    <Routes>
    
    <Route path="/" element={<Navigate to='/posts' replace/>}/>
    <Route path="/posts" element={<Home/>}/>
    <Route path="/posts/search" element={<Home/>}/>
    <Route path="/posts/:id" element={<PostDetails/>}/>
    {/* <Link to="/">Home</Link> */}
    <Route path="/auth" action={()=>!user? <Navigate to='/posts' replace/>: <Auth/>} element={<Auth/>} />
    
    
    
    </Routes>
    </Container>
   
     
      
    </GoogleOAuthProvider>;
    </Router>
  )

}

export default App