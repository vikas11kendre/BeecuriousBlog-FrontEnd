import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./styles.css";
import loading from "../../images/loading1.gif";
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  // console.log(draftToHtml(JSON.parse(post.message)));
  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [dispatch, post]);

  if (!post) return null;
  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="img"
          alt="loading"
          src={loading}
          sx={{ width: "90%" }}
        />
      </Box>
    );
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  return (
    <Box
      sx={{
        mt: "40px",
        maxWidth: "lg",
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexBasis: "60%",
          flexDirection: "column",
        }}
      >
        {/* <Stack sx={{ maxWidth: "md" }}> */}
        {/* user name */}
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <AccountCircleIcon
            sx={{
              color: "#505BF7",
              cursor: "pointer",
              width: { xs: "46px" },
              height: { xs: "46px" },
              mr: "8px",
              ml: "2px",
            }}
          />

          <Typography
            sx={{
              fontSize: { md: "28px", sm: "28px", xs: "18px" },
              fontWeight: "600",
              color: " #0A0B0D",
              mr: "20px",
            }}
          >
            {post?.name?.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              color: "#888585",
              fontSize: { sm: "14px", xs: "11px" },
              fontWeight: "600",
            }}
          >
            - {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            mt: "30px",
            flexWrap: "wrap",
            alignItems: "center",
            ml: "10px",
          }}
        >
          <Typography
            sx={{
              color: " #0A0B0D",
              fontSize: "14px",
              mr: "14px",
              fontWeight: "600",
            }}
          >
            Tags :
          </Typography>
          {post.tags.map((tag, i) => (
            <Box
              key={i}
              sx={{ background: "#EDF2F8", borderRadius: "20px", mr: "12px" }}
            >
              <Typography
                sx={{
                  fontSize: {
                    lg: "14px",
                    md: "14px",
                    sm: "14px",
                    xs: "14px",
                  },
                  color: " #4E596C",
                  ml: "8px",
                  mr: "8px",
                  fontWeight: "600",
                  p: "3px",
                }}
              >
                <span></span> #{tag}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* catageory */}
        <Box
          sx={{
            display: "flex",
            mt: "30px",
            flexWrap: "wrap",
            alignItems: "center",
            ml: "10px",
          }}
        >
          <Typography
            sx={{
              color: " #0A0B0D",
              fontSize: "14px",
              mr: "14px",
              fontWeight: "600",
            }}
          >
            Catageory :
          </Typography>
          <Box sx={{ background: "#FED75B", borderRadius: "14px", mr: "12px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: " #262A31",
                ml: "8px",
                mr: "8px",
                fontWeight: "600",
                p: "3px",
              }}
            >
              {post.catageory}
            </Typography>
          </Box>
        </Box>
        {/* title */}
        <Typography
          sx={{
            mt: "30px",
            color: "#6B75FF",
            fontSize: "30px",
            fontWeight: "600",
            mb: "22px",
          }}
        >
          {post?.title}
        </Typography>
        {/* main image */}
        <Box>
          <Box
            component="img"
            alt={post?.title}
            src={post?.selectedFile}
            sx={{ objectFit: "contain", maxHeight: "400px", width: "100%" }}
            loading="lazy"
          />
        </Box>
        <Box
          sx={{ overflowX: "scroll" }}
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(post.message)),
          }}
          className="editor-content"
        >
          {/* <div
              dangerouslySetInnerHTML={{
                __html: draftToHtml(JSON.parse(post.message)),
              }}
            /> */}
        </Box>
        <Box>{<CommentSection post={post} />}</Box>
        {/* </Stack> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexBasis: "40%",
          flexDirection: "column",
          ml: "5px",
        }}
      >
        <Box>
          {recommendedPosts.length && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  color: "#0A0B0D",
                  fontSize: "24px",
                  fontWeight: "600",
                  mb: "24px",
                }}
              >
                You might also like
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", pl: "16px" }}>
          {recommendedPosts.map((rpost, i) => (
            <Box
              key={i}
              onClick={() => navigate(`/posts/${rpost._id}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "20px",
                cursor: "pointer",
              }}
            >
              <Box sx={{ flexBasis: "70%" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                  {rpost.title}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {rpost.name} in {rpost.catageory}
                </Typography>
              </Box>
              <Box sx={{ flexBasis: "30%" }}>
                <Box
                  component="img"
                  loading="lazy"
                  alt={rpost?.title}
                  src={rpost.selectedFile}
                  sx={{ width: "100%", maxHeight: "140px", objectFit: "fill" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PostDetails;
