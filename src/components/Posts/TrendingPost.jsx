import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import moment from "moment";
import { useNavigate } from "react-router-dom";

const TrendingPost = () => {
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
              color: " #030303",
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
      <Grid item xs={12} sx={{ mb: "10px" }}>
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: { sm: "20px", xs: "10px" },
                        }}
                      >
                        <Box
                          component="img"
                          loading="lazy"
                          onClick={() => navigate(`/posts/${post._id}`)}
                          src={post?.selectedFile}
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

                          p: "12px",
                        }}
                      >
                        <Box
                          onClick={() =>
                            navigate(`/catageory/${post?.catageory}`)
                          }
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            background: "#FFE9A2",
                            maxWidth: "100px",
                            p: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color: " #0A0B0D",
                            }}
                          >
                            {post?.catageory.toUpperCase()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            onClick={() => navigate(`/posts/${post._id}`)}
                            sx={{
                              color: " #0A0B0D",
                              mt: "10px",
                              fontSize: {
                                lg: "28px",
                                md: "26px",
                                sm: "20px",
                                xs: "18px",
                              },
                              fontWeight: "700",
                              cursor: "pointer",
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
                              color: " #0A0B0D",
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
                                backgroundColor: "#4168FA",
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
                              onClick={() => navigate(`/creators/${post.name}`)}
                              sx={{
                                fontSize: { xs: "12px" },
                                fontWeight: "600",
                                color: " #0A0B0D",
                                pr: "5px",
                                cursor: "pointer",
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
                            onClick={() => navigate(`/posts/${post._id}`)}
                            sx={{
                              color: "#10172B",
                              p: "5px",
                              fontSize: "14px",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          >
                            Read More
                          </Typography>
                          <Typography
                            sx={{
                              color: " #0A0B0D",
                              fontSize: "12px",
                              fontWeight: "600",
                              ml: "30px",
                            }}
                          >
                            - {moment(post.createdAt).fromNow()}
                          </Typography>
                        </Box>
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
