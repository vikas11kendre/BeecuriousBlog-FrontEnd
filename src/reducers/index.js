import { combineReducers } from "redux";

import posts from './posts'
import form from './form'
import id from './id'
import auth from './auth'


export default combineReducers({posts,form,id ,auth});