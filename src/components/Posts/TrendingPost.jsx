import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Post from './Post/Post'
import { useSelector} from "react-redux";

import Lottie from "lottie-react";
import loading from '../../images/loading.json'

const TrendingPost = () => {
    const style = {
        height: 600,
      };
      
      const {trendingPosts,isLoading} = useSelector((state) => state.posts);
     
      if (!trendingPosts?.data?.length && !isLoading) return 'No posts found';
      return (
        isLoading?<Box >
          {/* <Lottie animationData={loading} style={style} loop={true} /> */}
        </Box>:
        <Grid container>
        <Grid item  xs={12}>
        <Box><Typography variant='h5' sx={{color:"#6b7688"}}> Trending</Typography></Box>
        </Grid>
        
        
        {trendingPosts?.data?.map((post )=>(
          <Grid key={post._id} item xs={12} sm={6} lg={4}>
            <Box sx={{display:'flex' ,justifyContent:"center",alignItems:"center"}}>
            <Post post={post} />
            </Box>
           
          </Grid>
        ))}
          
        </Grid>
      )
}

export default TrendingPost