import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Dialog,
  Select,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const Search1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [searchCatageory, setSearchCatageory] = React.useState("Categories");

  const [open, setOpen] = React.useState(false);
  const handleCatageoryChange = (event) => {
    console.log(event.target.value);
    navigate(`/catageory/${event.target.value}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const serachPost = () => {
    tags.trim();

    if (search.trim() || tags.trim()) {
      dispatch(getPostsBySearch({ search, tags }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags || "none"}`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Grid sx={{ mt: "24px" }} item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "22px", xs: "14px" },
                fontWeight: "600",
                color: "#0A0B0D",
              }}
            >
              All Posts
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              onClick={handleClickOpen}
              sx={{
                width: { xs: "90px", sm: "110px" },
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: "16px",
                ml: { sm: "20px", xs: "8px" },
                mr: "20px",
                backgroundColor: "#FFE9A2",
                p: "2px",
                cursor: "pointer",
              }}
            >
              <SearchIcon
                sx={{
                  width: { xs: "20px", sm: "25px" },
                  height: { xs: "20px", sm: "25px" },
                }}
              />
              <Typography
                align="center"
                sx={{ fontSize: "14px", fontWeight: "600", color: "#0A0B0D" }}
              >
                Search
              </Typography>
            </Box>

            {/* catageory */}
            <Box
              sx={{
                width: { xs: "90px", sm: "110px" },
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: "5px",
                ml: "20px",
                mr: "20px",
                color: "#0A0B0D",

                cursor: "pointer",
              }}
            >
              {/* <InputLabel id="demo-simple-select-autowidth-label">
                searchCatageory
              </InputLabel> */}
              <Select
                sx={{ height: "30px", mr: "5px" }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={searchCatageory}
                height="100%"
                autoWidth
                onChange={handleCatageoryChange}
                variant="outlined"
                label="Categories"
              >
                <MenuItem value="Categories">Categories</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Idea">Idea</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Ecosystem">Ecosystem</MenuItem>
              </Select>
            </Box>
          </Box>
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
      <Dialog open={open} onClose={handleClose}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sx={{ p: "10px" }}>
              <Typography sx={{ mb: "10px" }}>Serach By title</Typography>
              <TextField
                name="search"
                variant="outlined"
                label="Serach Memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: "10px" }}>
              <Typography sx={{ mb: "10px" }}>Serach By tags</Typography>
              <TextField
                name="search"
                variant="outlined"
                label="enter tag name seperated by , "
                fullWidth
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12} sx={{ p: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  sx={{
                    mt: "10px",
                    p: "10px",
                    backgroundColor: "#FFE9A2",
                    borderRadius: "20px",
                  }}
                  onClick={() => {
                    serachPost();
                    handleClose();
                  }}
                >
                  <Typography>Search</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default React.memo(Search1);
