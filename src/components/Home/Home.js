import React, { useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getPosts, toggleForm ,getPostsBySearch, getTrendingPosts } from '../../actions/posts';
import Posts from '../Posts/Posts'
import Paginate from '../Paginate';
import { Button, Grid, Paper, Stack, TextField ,Box} from '@mui/material';
import { useLocation ,useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import TrendingPost from '../Posts/TrendingPost';

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
   
        
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const query = useQuery();
    const page =query.get('page') || 1;
    const searchQuery=query.get('searchQuery');
    const [search,setSearch]=useState('')
    const [tags,setTags]=useState('')
    dispatch(getTrendingPosts())
    
 
    const handleKeyPress=(e)=>{
      if (e.keyCode===13){

      }
    }
    const serachPost=()=>{
        tags.trim()
        console.log(tags)
      if (search.trim() || tags.trim() ){
        dispatch(getPostsBySearch({search,tags}))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags|| 'none'}`)
      }else{
        navigate("/")
      }
    }
   
    
  return (
    <Grid container sx={{mt:'30px'}}>
     
        <Grid item xs={12}  >
          <Grid container> 
          <Grid item md={4} sm={12} xs={12} sx={{ p:'10px'}} >
          <TextField
              name='search'
              variant='outlined'
              label='Serach Memories'
              fullWidth
              onKeyPress={handleKeyPress}
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12} sx={{p:'10px'}}>
          <TextField
              name='search'
              variant='outlined'
              label='add tags seperated by ,'
              fullWidth
              onKeyPress={handleKeyPress}
              value={tags}
              
              onChange={(e)=>{setTags(e.target.value)}}
            
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12} sx={{p:'10px'}}>
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>
            <Button sx={{mt:'10px'}} variant="contained" onClick ={serachPost}> Search </Button>
            </Box>
          </Grid>
          </Grid>
    
        </Grid>
        <Grid item xs={12}>
         {page===1 &&<TrendingPost/>} 
        </Grid>
        <Grid item xs={12}>
        <Posts  />
        </Grid>
        <Grid sx={{mt:"30px"}} item xs={12} >
        <Box sx={{display:'flex',justifyContent:"flex-end"}}>
        {(!searchQuery && !tags.length) && <Paginate page={page} />}
        </Box>
       
        </Grid>
      </Grid>
      
      
    
  
    
  )
}

export default Home