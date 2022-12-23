import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Posts/Post/Post";
import { getPostsByCatageory } from "../../actions/posts";

import loading from "../../images/loading1.gif";
import { Box, Grid, Typography } from "@mui/material";
const Catageory = () => {
  const { name } = useParams();

  const creatorName = name.replace("%20", " ");
  console.log(creatorName);
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsByCatageory(creatorName));
  }, []);

  if (!posts.length && !isLoading) return "No posts found";
  return isLoading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box component="img" src={loading} loading="lazy" sx={{ width: "90%" }} />
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
export default Catageory;
