import { Grid ,Box, Typography, Avatar, LinearProgress } from '@mui/material'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'

const PostDetails = () => {
   
    const {post ,posts,isLoading}=useSelector((state)=>state.posts);
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const {id}=useParams();
    useEffect(()=>{
      dispatch(getPost(id))
    },[id])
    useEffect(()=>{
      if (post){
        dispatch(getPostsBySearch({search:"none",tags:post?.tags.join(',')}))
      }
      
    },[post]);
   
    const openPost=(id)=>(navigate(`/posts/${id}`))
    
    if (!post) return null;
    if (isLoading){
      return (
        <LinearProgress sx={{mt:"250px",width:'100%',height:"30px"}}/>
      )
    }
    const recommendedPosts=posts.filter(({_id})=>_id!==post?._id);
  return (
    <Grid maxWidth='sm' container>
      <Grid item xs={12}>
          <Box component='img' sx={{display:"flex",width:"100%" ,height:'100%'}} src={post.selectedFile} alt="" />
      </Grid>
      <Grid item xs={12}>
          <Typography>{post.title}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Avatar alt={post.name} src={post.picture}>{post.name.charAt(0)}</Avatar>  <Typography>{post.name}</Typography> <Typography>{moment(post.createdAt).fromNow()}</Typography>
      </Grid>
      <Grid item xs={12}> {post.tags}</Grid>
      <Grid item xs={12}>
        <Box>
          {post.message}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          {<CommentSection post={post}/>}
        </Box>
      </Grid>

      <Grid sx={{mt:'50px'}} item xs={12}>
        <Box>
          {recommendedPosts.length&& ( 
            <Box>
            <Typography> You might also like</Typography>
            <Box sx={{width:"200px",display:"flex",cursor:"pointer"}}>
            {recommendedPosts.map(({title,message,name,likes,selectedFile,_id})=>(
              <Box onClick={()=>openPost(_id)} sx={{p:'20px'}} key={`${_id}`}>
                <Typography>{title}</Typography>
                <Typography>{name}</Typography>
                <Typography>{`likes ${likes.length}`}</Typography>
                <Box sx={{width:'50px'}}component='img' src={selectedFile}/>
              </Box>
            ))}
            </Box>
            
          </Box>
            
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default PostDetails