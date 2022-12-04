import { Typography,Box, TextField, Button } from '@mui/material'

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
    const c=[...(post?.comments)].reverse()
    const [comments,setComments]=useState(c);
    const [comment,setComment]=useState([]);
    const user =JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleClick = async() => {
        
        const date= (new Date().toLocaleDateString())
        const finalComment=`${user.result.name}: ${comment} :${date}`
        const newComments= await dispatch(commentPost(finalComment,post._id))
        const d= [...newComments].reverse()
        setComments(d);
        setComment('');
    }
  return (
    <Box>
    
    <Typography> Comment Section</Typography>
    <Box >
    {comments.map((c,i)=>(
        <Typography  gutterBottom variant="h6" key={i} >{c.split(':')[0]} {c.split(':')[1]} {c.split(':')[2]}   </Typography>
    ))}
    </Box>
    {user?.result?.name
        &&(<Box>
        <Typography>Write a comment </Typography>
        <TextField 
            fullWidth
            rows={4}
            label="comment"
            multiline
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
        />
        <Button 
        disabled={!comment}
        variant="contained"
        onClick={handleClick}
        
        > comment</Button>
    </Box>)}
    
        
    </Box>
  )
}

export default CommentSection