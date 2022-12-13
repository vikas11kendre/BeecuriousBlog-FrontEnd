import { FETCH_ALL,COMMENT,AUTH,START_LOADING,END_LOADING,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE,TOGGLE ,EDIT, SETID, LOGOUT, FETCH_POST} from '../constants/actionTypes';

import * as api from '../api/index.js';


export const getPosts=(page)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data}=await api.fetchPosts(page);
        
        dispatch({type:FETCH_ALL ,payload:data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
} 
export const getPost=(id)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data}=await api.fetchPost(id);
        
        dispatch({type:FETCH_POST ,payload:data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
} 

export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH ,payload:data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
}

export const createPost=(post ,navigate)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data}=await api.createPost(post);
       
        dispatch({type:CREATE ,payload:data})
        navigate('/')
        dispatch({type:END_LOADING})
       
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
}

export const toggleForm=(state)=>async (dispatch)=>{

    try{
       
       
        dispatch({type:TOGGLE ,payload:!state})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
}

export const updatePost=(id,post)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data}=await api.updatePost(id,post);
        
        dispatch({type:UPDATE ,payload:data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
}
export const setId=(currentid)=>async (dispatch)=>{

    try{
       
        dispatch({type:SETID ,payload:currentid})
    }
    catch(error){
        console.log(`known error ${error.message}`);
    }
}

export const deletePost=(id)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        await api.deletePost(id);
       
        dispatch({type:DELETE ,payload:id})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error);
    }
}
export const likePost=(id)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data} =await api.likePost(id);
       
        dispatch({type:LIKE ,payload:data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error);
    }
}

export const commentPost=(value,id)=>async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        const {data}=await api.comment(value,id);
       
        dispatch({type:COMMENT,payload:data})
        dispatch({type:END_LOADING})
        return data.comments
        
    }
    catch(error){
        console.log(error);
    }
}

export const setAuthData=({result,token})=>async (dispatch)=>{

    try{
        
        dispatch({type:AUTH ,data:{result,token}})
    }
    catch(error){
        console.log(error);
    }
}

export const logOut=()=>async (dispatch)=>{

    try{
        
        dispatch({type:LOGOUT })
    }
    catch(error){
        console.log(error);
    }
}