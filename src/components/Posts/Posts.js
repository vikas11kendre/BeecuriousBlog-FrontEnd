import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from './Post/Post'
import {  useDispatch, useSelector} from "react-redux";

import LinearProgress from '@mui/material/LinearProgress';
import { getPosts } from '../../actions/posts';


const Posts = () => {
 
  
  const {posts,isLoading} = useSelector((state) => state.posts);
  // const data= allposts
  // const [posts,setPosts]=useState(data);
  // const update=()=>{
  //   setPosts(allposts);
  // }
  // useEffect(() => {
  //   setPosts(allposts);
  // }, [allposts])
  if (!posts.length && !isLoading) return 'No posts found';
  return (
    isLoading?<LinearProgress sx={{mt:"250px",width:'100%',height:"30px"}}/>:
    <Grid container>
    {posts.map((post )=>(
      <Grid key={post._id} item xs={12} sm={6} lg={4}>
        <Post post={post} />
      </Grid>
    ))}
      
    </Grid>
  )
}

export default Posts;