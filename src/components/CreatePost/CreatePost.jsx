import React, { useState, useEffect, useMemo } from "react";
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
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import FileBase from "react-file-base64";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getPost, setId, updatePost } from "../../actions/posts";

import { createPost } from "../../actions/posts";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const currentid = useSelector((state) => state.id);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.sub || user?.result?._id;
  const [selectCatageory, setSelectCatageory] = React.useState("");
  const [loading, setLoading] = useState(false);
  // const cUrl = process.env.REACT_APP_CLOUDNERY_URL;
  // const cName = process.env.REACT_APP_CLOUDNERY_NAME;

  const [postData, setPostData] = useState({
    title: "",
    message: {},
    tags: "",
    selectedFile: "",
    trending: false,
    subtitle: "",
    catageory: "Technology",
  });

  useEffect(() => {
    dispatch(getPost(currentid));
  }, [dispatch, currentid]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (post && currentid) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(post.message)))
      );
      setPostData(post);
      setSelectCatageory(post.catageory || "Technology");
    }
  }, [post, currentid]);
  const handleChange = (e) => {
    setPostData({ ...postData, trending: e.target.checked });
  };
  const handleChangeEditor = (data) => {
    setEditorState(data);
  };
  const handleSelect = (e) => {
    setSelectCatageory(e.target.value || "Technology");
    setPostData({
      ...postData,
      catageory: e.target.value || "Technology",
    });
  };
  const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDNERY_NAME);
    try {
      const res = await axios.post(
        process.env.REACT_APP_CLOUDNERY_URL,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !postData.title ||
      !postData.subtitle ||
      !postData.tags ||
      !postData.message ||
      !postData.selectedFile
    ) {
      Swal.fire("Please fill the form with all required fields");
    } else {
      if (currentid) {
        dispatch(updatePost(currentid, { ...postData }, navigate));
        dispatch(setId(null));
      } else {
        const post = {
          ...postData,
          name: user?.result?.name,
        };
        dispatch(createPost(post, navigate));
      }

      dispatch(setId(null));

      clear();
    }
  };
  const clear = () => {
    setPostData({
      title: "",
      message: {},
      tags: "",
      selectedFile: "",
      trending: false,
      subtitle: "",
      catageory: "Technology",
    });
    setEditorState(EditorState.createEmpty());

    dispatch(setId(null));
  };
  var Data = useMemo(() => {
    const stringData = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setPostData({ ...postData, message: stringData });
  }, [editorState]);

  if (!user?.result?.name) {
    return <Alert severity="error">Please sign in to create post</Alert>;
  }
  return (
    <div>
      <Typography
        sx={{
          mt: "40px",
          mb: "10px",
          color: "#030303",
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        {currentid ? "Upadte Post" : "Create Post"}
      </Typography>
      <div>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Paper>
            <TextField
              sx={{ pb: "20px" }}
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData?.title}
              required
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mt: "20px",
                mb: "20px",
                ml: "20px",
              }}
            >
              {loading ? (
                <Typography sx={{ color: "red", mr: "10px" }}>
                  Uploading...
                </Typography>
              ) : (
                <Box>
                  {postData?.selectedFile?.length > 5 && (
                    <Box
                      component="img"
                      alt="upload Image"
                      loading="lazy"
                      src={postData?.selectedFile}
                      sx={{ width: "200px", maxHeight: "200px" }}
                    ></Box>
                  )}
                </Box>
              )}

              <Box sx={{ mb: "20px", mt: "20px", ml: "20px" }}>
                <Typography sx={{ mb: "10px" }}>Upload Blog Image</Typography>
                <FileBase
                  type="file"
                  required
                  multiple={false}
                  onDone={async ({ base64, size, type }) => {
                    const sizeinkb = Number(size.replace("kB", ""));
                    console.log(sizeinkb);
                    if (
                      type === "image/png" ||
                      type === "image/jpeg" ||
                      type === "image/webp"
                    ) {
                      if (sizeinkb <= 150) {
                        setLoading(true);
                        const url = await imageUpload(base64);
                        setPostData({ ...postData, selectedFile: url });
                        setLoading(false);
                      } else {
                        Swal.fire(
                          "Only image less than 150 kb is spported , you search online image compresser and reupload"
                        );
                      }
                    } else {
                      Swal.fire("notSupported file format");
                    }
                  }}
                />
              </Box>
            </Box>

            <TextField
              sx={{ pb: "20px" }}
              name="subtitle"
              variant="outlined"
              label="Subtitle"
              fullWidth
              required
              value={postData?.subtitle}
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
              <Typography sx={{ mr: "5px", ml: "5px", fontSize: "14px" }}>
                {`Select Catagerory`}
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

            <Box sx={{ minHeight: "100px" }}>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleChangeEditor}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Box>
            {/* <Box> {draftToHtml((JSON.parse(postData.message)))}</Box> */}

            <TextField
              name="tags"
              variant="outlined"
              label="Tags (coma separated)"
              fullWidth
              required
              sx={{ mt: "40px" }}
              value={postData?.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            {userId === "639731de321f262c6969a414" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: "40px",
                  mt: "10px",
                }}
              >
                <Switch checked={postData?.trending} onChange={handleChange} />
                <Typography sx={{ ml: "5px" }}>
                  {postData?.trending ? "true" : "false"}
                </Typography>
              </Box>
            )}
          </Paper>

          <Button variant="outlined" onClick={clear}>
            clear
          </Button>
          <Button sx={{ ml: "10px" }} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <Box sx={{ mb: "40px" }}></Box>
    </div>
  );
};

export default CreatePost;
