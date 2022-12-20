import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Paginate from "../Paginate";
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import TrendingPost from "../Posts/TrendingPost";
import beefind from "../../images/beefind.json";
import Banner from "./Banner";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [searchCatageory, setSearchCatageory] = React.useState("");
  const [openCatageory, setOpenCatageory] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCatageoryChange = (event) => {
    setSearchCatageory(event.target.value || "Technology");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCatageoryClickOpen = () => {
    setOpenCatageory(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCatageoryClose = (event) => {
    setOpenCatageory(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
    }
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
    <Grid container sx={{ mt: "30px" }}>
      <Grid item xs={12}>
        {<TrendingPost />}
      </Grid>

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

              // background: "#0A0B0D",
              // borderRadius: "18px",
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
            <Lottie
              animationData={beefind}
              style={{ height: "50px" }}
              loop={true}
            />
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
            <Box
              onClick={handleCatageoryClickOpen}
              sx={{
                width: { xs: "90px", sm: "110px" },
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: "5px",
                ml: { sm: "20px", xs: "8px" },
                color: "#0A0B0D",
                border: "1px solid #697995",
                p: "2px",
                cursor: "pointer",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                category
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  width: { xs: "20px", sm: "25px" },
                  height: { xs: "20px", sm: "25px" },
                }}
              />
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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
      <Dialog
        open={openCatageory}
        onClose={handleCatageoryClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Select Catageory</DialogTitle>
        <DialogContent dividers={true}>
          <Typography sx={{ mr: "5px", fontSize: "12px" }}>
            Select Catageory
          </Typography>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={searchCatageory}
            autoWidth
            onChange={handleCatageoryChange}
            variant="outlined"
            label="catageory"
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="Idea">Idea</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Ecosystem">Ecosystem</MenuItem>
          </Select>
          <Button onClick={() => navigate(`/catageory/${searchCatageory}`)}>
            {" "}
            Search
          </Button>
        </DialogContent>
      </Dialog>

      <Grid item xs={12}>
        <Posts />
      </Grid>
      <Grid sx={{ mt: "30px" }} item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {!searchQuery && !tags.length && <Paginate page={page} />}
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ mt: "40px", mb: "80px" }}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #EDF2F8",
            borderRadius: "10px",
          }}
        >
          <Banner />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
