import React from "react";

import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
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
    showSweetAlert();
  };

  const openPost = () => navigate(`/posts/${post._id}`);
  const showAlert = () => Swal.fire("You need to login first");
  function showSweetAlert() {
    Swal.fire({
      title: "Hello!",
      text: "Thank  you for your love and support ",
      timer: 4000,
      timerProgressBar: true,
    });
  }
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon fontSize="small" />
            &nbsp;{post.likes.length}
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteBorderIcon fontSize="small" />
            {post.likes.length}
          </Box>
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize="small" />
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "320px",
        mb: "40px",
        mt: "20px",
      }}
    >
      <Box
        component="img"
        onClick={openPost}
        src={post.selectedFile}
        sx={{
          "&:hover": {
            transform: "scale(1.1)",
          },
          cursor: "pointer",
          height: "210px",
          width: { md: "320px", sm: "300px", lg: "320px", xs: "320px" },
          objectFit: "fill",
          borderRadius: "10px",
        }}
      />
      <Box sx={{ display: "flex", mt: "10px", flexWrap: "wrap" }}>
        {post.tags.map((tag) => (
          <Typography
            key={`12${uuidv4()}`}
            sx={{
              fontSize: "12px",
              color: "#6c757d",
              mr: "8px",
              fontWeight: "400",
            }}
          >
            #{tag}
          </Typography>
        ))}{" "}
        <Typography
          sx={{ color: "#6c757d", fontSize: "12px", fontWeight: "500" }}
        >
          - {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#343a40",
            mt: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {post.title.length > 90
            ? post.title.substring(0, 120).concat("...")
            : post.title}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ color: "#343a40", mt: "10px", fontSize: "12px" }}>
          {post.subtitle?.length > 90
            ? post.subtitle?.substring(0, 120).concat("...")
            : post?.subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: "10px",
          flexWrap: "wrap",
        }}
      >
        <Typography
          onClick={() => navigate(`/creators/${post.name}`)}
          sx={{
            color: "#7d7f81",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {post.name.toUpperCase()}
        </Typography>
        <Typography
          onClick={() => navigate(`/catageory/${post?.catageory}`)}
          sx={{
            color: "#7d7f81",
            fontSize: "12px",
            fontWeight: "600",
            ml: "10px",
          }}
        >
          - in {post?.catageory}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            mr: "12px",
            p: "4px",
            backgroundColor: "#4F5760",
            borderRadius: "4px",
          }}
        >
          <Typography
            onClick={openPost}
            sx={{
              color: "white",
              p: "5px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Read More
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6A6F74",
          }}
        >
          <Box
            disabled={!user?.result}
            onClick={userId ? handleLike : showAlert}
            sx={{
              pr: "5px",
              fontSize: "12px",
              opacity: userId ? "100%" : "40%",
            }}
          >
            {<Likes />}
          </Box>
          {(userId === post?.creator ||
            userId === "639731de321f262c6969a414") && (
            <Box sx={{ flexDirection: "row", display: "flex" }}>
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
      </Box>

      <Box></Box>
    </Box>
  );
};

export default Post;
