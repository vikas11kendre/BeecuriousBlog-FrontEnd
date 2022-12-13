
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {TextField, Button, Box, Paper, Alert, Switch, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import FileBase from 'react-file-base64';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { setId, toggleForm, updatePost } from '../../actions/posts';
import DialogTitle from '@mui/material/DialogTitle';
import { createPost } from '../../actions/posts';
import Text from "./text.js"
import { useNavigate } from 'react-router-dom';
// import draftToHtml from "draftjs-to-html";
const Form = () => {
  let navigate = useNavigate();
  const dispatch=useDispatch();
  const formState = useSelector((state) => state.form);
  const currentid = useSelector((state) => state.id);
  const user = JSON.parse(localStorage.getItem('profile'))
  const [postData,setPostData]=useState({
    title:"",message:{},tags:"",selectedFile:"",trending:false
  })
  // const [open, setOpen] = React.useState(false);
  const post =useSelector((state)=>currentid?state.posts.posts.find((p)=>p._id===currentid):null)
  const handleChange = (e) => {
    setPostData({...postData,trending:e.target.checked});
    console.log(postData)
  };
 
  const handleClickOpen = () => () => {
    dispatch(toggleForm(false));
  };
  useEffect(() => {
    if(post) setPostData(post)
  }, [post,currentid])
  
  const handleClose = () => {
    dispatch(toggleForm(true));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (currentid){
      dispatch(updatePost(currentid,{...postData,name:user?.result?.name}))
      dispatch(setId(null))
      navigate(`/posts/${currentid}`)
    }else{
      const post ={...postData,name:user?.result?.name}
      dispatch(createPost(post,navigate))
    }
    dispatch(setId(null))
    handleClose()
    // dispatch({type:"REFRESH"})
 
    clear()
  }
  const clear=()=>{
    setPostData({
      title:"",message:"",tags:"",selectedFile:"",trending:false
    })
    dispatch(setId(null))
    // handleClose()
  }
  if (!user?.result?.name){
    return (
      <Alert severity="error">Please sign in to create post</Alert>
    )
  }
    return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Create Post</Button>
      
      <Dialog
        open={formState}
        onClose={handleClose}
      
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
      <form autoComplete="off" noValidate onSubmit={handleSubmit} >
        <DialogTitle id="scroll-dialog-title">Create Blog Post</DialogTitle>
        <DialogContent dividers={true}>
        <Paper >
        
        
        <TextField sx={{pb:"20px"}} name="title" variant="outlined" label="Title" fullWidth 
        value={postData.title} 
        onChange={(e)=>setPostData({...postData,title:e.target.value})} />

          <Text postData={postData} setPostData={setPostData} post={post}/>
          {/* <Box> {draftToHtml((JSON.parse(postData.message)))}</Box> */}

        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth  
        value={postData.tags}
        onChange={(e)=>setPostData({...postData,tags:e.target.value.split(",")})} 
        />
         <Switch checked={postData.trending} onChange={handleChange} /> <Typography>{postData.trending?'true':'false'}</Typography>
        <Box sx={{pt:"20px"}}><FileBase type="file" multiple={false} 
            onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
         /></Box>
        <Button onClick={()=>console.log(postData)}>print</Button>
        </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={clear}>clear</Button>
          <Button type="submit" >Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Form