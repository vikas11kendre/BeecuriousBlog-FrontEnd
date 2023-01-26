import React, { useEffect } from "react";

import Posts from "../Posts/Posts";
import Paginate from "../Paginate";

import { useLocation } from "react-router-dom";

import TrendingPost from "../Posts/TrendingPost";

import Search1 from "../Serach/Search1";

import { useDispatch } from "react-redux";
import { getTrendingPosts } from "../../actions/posts";
import Heading from "./heading";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendingPosts());
  }, [dispatch]);
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
        flexWrap: "warp",
      }}
    >
      <Heading />
      <TrendingPost />
      <Search1 />
      <Posts />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <Paginate page={page} />
      </div>
    </div>
  );
};

export default Home;
