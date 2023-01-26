import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Posts/Post/Post";
import { getPostsByCreator } from "../../actions/posts";

import loading from "../../images/loading1.gif";
import { Box, Grid, Typography } from "@mui/material";
const Creator = () => {
  const { name } = useParams();

  const creatorName = name.replace("%20", " ");

  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsByCreator(creatorName));
  }, [creatorName, dispatch]);

  if (!posts.length && !isLoading) return "No posts found";
  return isLoading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box component="img" alt="loading" src={loading} sx={{ width: "90%" }} />
    </Box>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#6b7688",
              fontSize: "24px",
              fontWeight: "600",
              mt: "24px",
            }}
          >
            {`Posts Created by ${creatorName}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "1px",
            border: "border: 1px solid #7D8893",

            mb: "12px",
            backgroundColor: "#CBD4DE",
          }}
        />
      </Grid>
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
export default Creator;
