import { combineReducers } from "redux";

import posts from "./posts";

import id from "./id";
import auth from "./auth";

export default combineReducers({ posts, id, auth });
