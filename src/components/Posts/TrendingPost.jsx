import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
// import Post from './Post/Post'
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles

// import Lottie from "lottie-react";
// import loading from '../../images/loading.json'
import moment from "moment";
import { useNavigate } from "react-router-dom";

const openPost = () => {};

const TrendingPost = () => {
  const style = {
    height: 600,
  };

  const { trendingPosts, isLoading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  if (!trendingPosts?.data?.length && !isLoading) return "No posts found";
  return (
    <Grid sx={{ mb: "10px" }} container>
      <Grid item xs={12}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: " #636C7C",
              fontSize: "22px",
              fontWeight: "700",
              mt: "30px",
            }}
          >
            Trending Posts
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "1px",
            border: "border: 1px solid #7D8893",
            mt: "8px",
            mb: "35px",
            backgroundColor: "#CBD4DE",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {trendingPosts?.data?.map((post) => (
            <SwiperSlide key={post._id}>
              <Grid
                item
                xs={12}
                sx={{ border: "1px solid #EDF2F8", borderRadius: "10px" }}
              >
                <Box
                  onClick={() => navigate(`/posts/${post._id}`)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: "20px",
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
                            height: { md: "300px", xs: "230px", sm: "260px" },

                            objectFit: "contain",

                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          mb: "40px",
                          mt: "20px",
                          p: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            background: "#FFE9A2",
                            maxWidth: "100px",
                            p: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color: "#354156",
                            }}
                          >
                            {post?.catageory.toUpperCase()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#343A40",
                              mt: "10px",
                              fontSize: {
                                lg: "30px",
                                md: "26px",
                                sm: "20px",
                                xs: "18px",
                              },
                              fontWeight: "700",
                            }}
                          >
                            {post.title.length > 120
                              ? post.substring(0, 120).concat("...")
                              : post.title}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#354156",
                              mt: "10px",
                              fontSize: {
                                lg: "16px",
                                md: "16px",
                                sm: "14px",
                                xs: "12px",
                              },
                            }}
                          >
                            {post.subtitle?.length > 110
                              ? post.subtitle?.substring(0, 110).concat("...")
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
                                color: "#354156",
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

                              flexDirection: "row",
                              background: "#EDF2F8",
                              borderRadius: "10px",
                              p: "4px",
                              maxWidth: "250px",
                            }}
                          >
                            <Avatar
                              alt={post.name}
                              sx={{
                                backgroundColor: "#354156",
                                cursor: "pointer",
                                width: { xs: "20px" },
                                height: { xs: "20px" },
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
                              sx={{
                                fontSize: { xs: "12px" },
                                fontWeight: "800",
                                color: "#4E596C",
                                pr: "5px",
                              }}
                            >
                              {post.name.toUpperCase()}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              ml: "10px",
                              mr: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {post.likes.length ? (
                              <FavoriteIcon sx={{ color: "#6B75FF" }} />
                            ) : (
                              <FavoriteBorderIcon sx={{ color: "#6B75FF" }} />
                            )}
                            <Typography sx={{ color: "#6B75FF" }}>
                              {post.likes.length}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              color: "#888585",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            - {moment(post.createdAt).fromNow()}
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
                          <Typography
                            sx={{
                              color: "#4168FA",
                              p: "5px",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Read More
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              color: "#6A6F74",
                            }}
                          ></Box>
                        </Box>

                        <Box></Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default TrendingPost;
