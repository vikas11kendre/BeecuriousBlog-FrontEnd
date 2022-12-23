import React from "react";

import Typography from "@mui/material/Typography";
// import { v4 as uuidv4 } from "uuid";
import { Avatar, Box } from "@mui/material";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  setId,
  toggleForm,
  deletePost,
  likePost,
} from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const userId = user?.result.sub || user?.result?._id;

  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setId(post._id));
    dispatch(toggleForm(false));
  };
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const handleLike = () => {
    dispatch(likePost(post._id));

    Swal.fire(
      " Thank  you for your love and support ,it will take few seconds to update"
    );
  };

  const openPost = () => navigate(`/posts/${post._id}`);
  const showAlert = () => Swal.fire("You need to login first");

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post?.likes?.find((like) => like === userId) ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#4168FA",
              cursor: "pointer",
            }}
          >
            <FavoriteIcon fontSize="small" />
            &nbsp;{post?.likes?.length}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#4168FA",
            cursor: "pointer",
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
          {post.likes.length}
        </Box>
      );
    }

    return (
      <>
        <FavoriteBorderIcon
          sx={{ color: "#4168FA", cursor: "pointer" }}
          fontSize="small"
        />
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "326px",
        mb: "40px",
        mt: "20px",
      }}
    >
      <Box
        component="img"
        loading="lazy"
        onClick={openPost}
        src={post?.selectedFile}
        sx={{
          "&:hover": {
            transform: "scale(1.1)",
          },
          cursor: "pointer",
          height: "210px",
          width: { md: "320px", sm: "300px", lg: "320px", xs: "320px" },
          objectFit: "contain",
          borderRadius: "10px",
          border: "1px solid #EDF2F8",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: "40px",
          mt: { sm: "20px", xs: "8px" },
        }}
      >
        <Box
          onClick={() => navigate(`/catageory/${post?.catageory}`)}
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "#FFE9A2",
            maxWidth: "90px",
            p: "2px",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              color: " #0A0B0D",
            }}
          >
            {post?.catageory.toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ maxHeight: "62px" }}>
          <Typography
            sx={{
              color: " #0A0B0D",
              mt: "10px",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            {post?.title?.length > 90
              ? post?.substring(0, 90).concat("...")
              : post?.title}
          </Typography>
        </Box>
        <Box sx={{ mt: "10px" }}>
          <Typography
            sx={{
              color: " #0A0B0D",

              fontSize: {
                lg: "14px",
                md: "14px",
                sm: "14px",
                xs: "14px",
              },
            }}
          >
            {post.subtitle?.length > 90
              ? post.subtitle?.substring(0, 90).concat("...")
              : post?.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: "10px",
            flexWrap: "wrap",
          }}
        >
          {post.tags.map((tag) => (
            <Typography
              key={tag}
              sx={{
                fontSize: {
                  lg: "12px",
                  md: "12px",
                  sm: "12px",
                  xs: "12px",
                },
                color: " #0A0B0D",
                mr: "8px",
                fontWeight: "400",
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            mt: "10px",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              mr: "10px",
              flexDirection: "row",
              background: "#EDF2F8",
              borderRadius: "10px",
              p: "4px",
              maxWidth: "250px",
            }}
          >
            <Avatar
              onClick={() => navigate(`/creators/${post.name}`)}
              alt={post.name}
              sx={{
                backgroundColor: "#4168FA",
                cursor: "pointer",
                width: { xs: "18px" },
                height: { xs: "18px" },
                mr: "8px",
                ml: "2px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {post.name.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
            <Typography
              onClick={() => navigate(`/creators/${post.name}`)}
              sx={{
                fontSize: { xs: "11px" },
                fontWeight: "600",
                color: " #0A0B0D",
                pr: "5px",
                cursor: "pointer",
              }}
            >
              {post.name.toUpperCase()}
            </Typography>
          </Box>

          <Box onClick={userId ? handleLike : showAlert}>
            <Likes />
          </Box>

          {(userId === post?.creator ||
            userId === "639731de321f262c6969a414") && (
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                color: "#37588D",
                height: "18px",
                width: "18px",
                alignItems: "center",
                ml: "20px",
              }}
            >
              <EditIcon
                onClick={handleEdit}
                sx={{ pr: "5px", cursor: "pointer" }}
              />

              <DeleteOutlineIcon
                sx={{ cursor: "pointer" }}
                onClick={handleDelete}
              />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: "16px",
          }}
        >
          <Typography
            onClick={openPost}
            sx={{
              color: "#4168FA",

              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Read More
          </Typography>
          <Typography
            sx={{
              color: " #0A0B0D",
              fontSize: "11px",
              fontWeight: "600",
              ml: "10px",
            }}
          >
            - {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
