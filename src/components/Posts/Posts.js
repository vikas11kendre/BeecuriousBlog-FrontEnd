import { Box, Grid } from "@mui/material";
import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import loading from "../../images/loading1.gif";

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts found";
  return isLoading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box component="img" src={loading} sx={{ width: "90%" }} />
    </Box>
  ) : (
    <Grid container>
      <Grid item xs={12}></Grid>
      {posts.map((post, i) => (
        <Grid key={i} item xs={12} sm={6} lg={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Post post={post} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
