import { Grid ,Box, Typography, Avatar, LinearProgress, Paper } from '@mui/material'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import draftToHtml from "draftjs-to-html";
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import './styles.css'
import loading from '../../images/loading.json'
import Lottie from "lottie-react";
import Post from '../Posts/Post/Post';
const PostDetails = () => {
  const style = {
    height: 600,
  };
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
   
    // const openPost=(id)=>(navigate(`/posts/${id}`))
    
    if (!post) return null;
    if (isLoading){
      return (
        <Box >
      <Lottie animationData={loading} style={style} loop={true} />
    </Box>
      )
    }
    const recommendedPosts=posts.filter(({_id})=>_id!==post?._id);
   
   
  return (
    
    <Grid  container>
     <Grid item xs={12} sx={{mt:"40px"}}>
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'center' ,}}>
            <Paper><Box component='img' src={post.selectedFile} alt={post.name} sx={{display:'flex',maxWidth: '100%', maxHeight:"450px"}}/></Paper>
        </Box>
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'center' ,mt:"40px"}}>
            <Typography  align="center" variant='h4' sx={{fontWeight:'600' ,color:"#030303"}} >{post.title}</Typography>
        </Box>
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'center' ,mt:"40px" , flexWrap: 'wrap'}}>
            <Typography sx={{mr:"20px" ,fontWeight:"600" ,color:'#46364a'}} align="center" variant='body1' >Tags :</Typography>
            {post.tags.map((tag) => 
            <Box key={tag} sx={{background:'#505BF7' ,p:"8px", m:'10px'  ,borderRadius:'12px'}}><Typography variant='body1' sx={{color:'white'}}>#{tag}</Typography></Box>)}
        </Box>
        <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'center'  ,flexDirection:"row"}}>
          <Box sx={{display:'flex' ,alignItems:"center",justifyContent:'center' ,mt:"40px" ,flexDirection:"row"}}>
              <Avatar sx={{backgroundColor:"#F4511E"}} alt={post.name} src={post.picture}><Typography variant='body1' >{post.name.charAt(0)}</Typography></Avatar>  
              <Typography variant='body1' sx={{ml:"20px" ,fontWeight:'bold',color:'#6b7688'}}>{post.name}</Typography>
              <ThumbUpAltIcon  sx={{ml:"20px",color:"#505BF7"}} fontSize="small" /><Typography variant='body1' sx={{ml:"5px"}}>{post.likes.length}</Typography>
              <Typography variant='body1' sx={{ ml:"20px",color:'#46364a'}}>{moment(post.createdAt).fromNow()}</Typography>
          </Box>
          
        </Box>
     </Grid>
     <Grid item xs={12} sx={{mt:"40px"}}>
      <Paper>
      <Box sx={{overflowX: 'scroll'}} dangerouslySetInnerHTML={{__html: draftToHtml((JSON.parse(post.message)))}} >
      </Box> 
      </Paper>
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
            {/* <Box sx={{width:"200px",display:"flex",cursor:"pointer"}}>
            {recommendedPosts.map(({title,message,name,likes,selectedFile,_id})=>(
              <Box onClick={()=>openPost(_id)} sx={{p:'20px'}} key={`${_id}`}>
                <Typography>{title}</Typography>
                <Typography>{name}</Typography>
                <Typography>{`likes ${likes.length}`}</Typography>
                <Box sx={{width:'50px'}}component='img' src={selectedFile}/>
              </Box>
            ))}
            </Box> */}
            <Grid container>
            {posts.map((post )=>(
      <Grid key={post._id} item xs={12} sm={6} lg={4}>
        <Box sx={{display:'flex' ,justifyContent:"center",alignItems:"center"}}>
        <Post post={post} />
        </Box>
       
      </Grid>
    ))}
            </Grid>
 

            
          </Box>
            
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default PostDetails