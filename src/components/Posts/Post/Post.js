import React from 'react'
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Avatar, Box, Button, CardHeader, Chip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setId, toggleForm ,deletePost,likePost} from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({post}) => {
 
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate =useNavigate();
  const userId = user?.result.sub || user?.result?._id;

    const dispatch=useDispatch();
    const handleEdit=()=>{
      dispatch(setId(post._id))
      dispatch(toggleForm(false))
      
    }
    const handleDelete=()=>{
      dispatch(deletePost(post._id))
      
    }
    const handleLike=()=>{
      dispatch(likePost(post._id))
      // dispatch(getPosts())
      // update()
      // update()
      
    }
    const openPost=()=>navigate(`/posts/${post._id}`)
    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === userId)
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };

  return (
  
    <Card  sx={{ width: 320,height:450 ,mt:"40px" ,justifyContent:'center'  }}>
    
      <CardMedia
        onClick={openPost}
        component="img"
        height="230"
        image={post.selectedFile}
        alt="green iguana"
        sx={{cursor:"pointer"}}
      />
      
      <CardContent>
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'space-between'}}>
        <Chip component='div'  label="Technology" color="primary" /> 
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'space-between',color:"#3F39A8"}}>
        <Button disabled={!user?.result} onClick={handleLike} sx={{pr:"5px",fontSize:"12px" }}>
          {<Likes/>}
        </Button>
        {(userId===post?.creator || userId==='639731de321f262c6969a414') && (<Box sx={{flexDirection:"row",display:'flex'}}><EditIcon onClick={handleEdit} sx={{pr:"5px",cursor:"pointer"}}/> 

        <DeleteOutlineIcon sx={{cursor:"pointer"}} onClick={handleDelete}/></Box>)}
        
        </Box>
        </Box>
       
        <Box sx={{pt:'5px',display :"flex" ,flexWrap:'wrap' , alignItems:'center'}}> 
      
      <Typography > {post.tags.map((tag)=>`#${tag} `)}</Typography>
      
     
      </Box>
     
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Box sx={{display:"felx", justifyContent:"flex-start"}}>
        <CardHeader sx={{p:"0"}}
        avatar={
          <Avatar sx={{ bgcolor: "#7D41E1" }} aria-label="recipe">
           {(post.name).slice(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
             <ShareIcon/> 
          </IconButton>
        }
        title={post.name.toUpperCase()}
        subheader={moment(post.createdAt).fromNow()}
      />
        </Box>
        
      </CardContent>
      
    </Card>)
}

export default Post;