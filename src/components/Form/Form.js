import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Switch,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import FileBase from "react-file-base64";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { setId, toggleForm, updatePost } from "../../actions/posts";
import DialogTitle from "@mui/material/DialogTitle";
import { createPost } from "../../actions/posts";
import Text from "./text.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Form = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const currentid = useSelector((state) => state.id);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.sub || user?.result?._id;
  const [selectCatageory, setSelectCatageory] = React.useState("");
  const [postData, setPostData] = useState({
    title: "",
    message: {},
    tags: "",
    selectedFile:
      "https://res.cloudinary.com/duznj2u7e/image/upload/v1671263300/bee_z14bwi.png",
    trending: false,
    subtitle: "",
    catageory: "Technology",
  });

  const post = useSelector((state) =>
    currentid ? state.posts.posts.find((p) => p._id === currentid) : null
  );
  const handleChange = (e) => {
    setPostData({ ...postData, trending: e.target.checked });
  };

  const handleClickOpen = () => () => {
    dispatch(toggleForm(false));
  };

  const handleSelect = (e) => {
    setSelectCatageory(e.target.value || "Technology");
    setPostData({
      ...postData,
      catageory: e.target.value || "Technology",
    });
  };
  const handleClose = () => {
    dispatch(toggleForm(true));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !postData.title ||
      !postData.subtitle ||
      !postData.tags ||
      !postData.message
    ) {
      handleClose();
      Swal.fire("Please fill the form with all required fields");
    } else {
      if (currentid) {
        dispatch(updatePost(currentid, { ...postData }));
        dispatch(setId(null));
        navigate(`/posts/${currentid}`);
      } else {
        const post = { ...postData, name: user?.result?.name };
        dispatch(createPost(post, navigate));
      }
      dispatch(setId(null));
      handleClose();

      clear();
    }
  };
  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      trending: false,
    });
    dispatch(setId(null));
    handleClose();
  };
  if (!user?.result?.name) {
    return <Alert severity="error">Please sign in to create post</Alert>;
  }
  return (
    <div>
      <Typography
        onClick={handleClickOpen("paper")}
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          mr: "5px",
        }}
      >
        <EditIcon sx={{ ml: "6px", mr: "8px" }} />
        Write
      </Typography>

      <Dialog
        open={formState}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle id="scroll-dialog-title">Create Blog Post</DialogTitle>
          <DialogContent dividers={true}>
            <Paper>
              <TextField
                sx={{ pb: "20px" }}
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                required
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
              <Box sx={{ mb: "20px" }}>
                <Typography sx={{ mb: "10px" }}> Upload Blog Image</Typography>
                <FileBase
                  type="file"
                  required
                  multiple={false}
                  onDone={({ base64, size, type }) => {
                    const sizeinkb = Number(size.replace("kB", ""));
                    console.log(sizeinkb);
                    if (
                      type === "image/png" ||
                      type === "image/jpeg" ||
                      type === "image/webp"
                    ) {
                      if (sizeinkb <= 150) {
                        setPostData({ ...postData, selectedFile: base64 });
                      } else {
                        handleClose();
                        Swal.fire(
                          "Only image less than 150 kb is spported , you search online image compresser and reupload"
                        );
                      }
                    } else {
                      handleClose();
                      Swal.fire("notSupported file format");
                    }
                  }}
                />
              </Box>

              <TextField
                sx={{ pb: "20px" }}
                name="subtitle"
                variant="outlined"
                label="Subtitle"
                fullWidth
                required
                value={postData.subtitle}
                onChange={(e) =>
                  setPostData({ ...postData, subtitle: e.target.value })
                }
              />
              <Box
                sx={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  mb: "20px",
                }}
              >
                <Typography sx={{ mr: "5px", fontSize: "14px" }}>
                  {selectCatageory ? `${selectCatageory}` : `Select Catagerory`}
                </Typography>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={selectCatageory}
                  autoWidth
                  onChange={handleSelect}
                  variant="outlined"
                  label="catageory"
                  defaultValue="Technology"
                >
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                  <MenuItem value="Idea">Idea</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Ecosystem">Ecosystem</MenuItem>
                </Select>
              </Box>

              <Text postData={postData} setPostData={setPostData} post={post} />
              {/* <Box> {draftToHtml((JSON.parse(postData.message)))}</Box> */}

              <TextField
                name="tags"
                variant="outlined"
                label="Tags (coma separated)"
                fullWidth
                required
                sx={{ mt: "40px" }}
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />
              {userId === "639731de321f262c6969a414" && (
                <Box>
                  <Switch checked={postData.trending} onChange={handleChange} />{" "}
                  <Typography>
                    {postData.trending ? "true" : "false"}
                  </Typography>
                </Box>
              )}
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={clear}>clear</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Form;
