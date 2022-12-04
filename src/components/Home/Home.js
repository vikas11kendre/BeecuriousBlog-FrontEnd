import React, { useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getPosts, toggleForm ,getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts'
import Paginate from '../Paginate';
import { Button, Grid, Paper, Stack, TextField } from '@mui/material';
import { useLocation ,useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';

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
    
    useEffect(() => {
      dispatch(toggleForm(true))
      
   
    }, [dispatch]);
 
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
    <Stack>
      <Grid container>
        <Grid item>
        <Paper sx={{mt:'20px'}}>
          <TextField
            name='search'
            variant='outlined'
            label='Serach Memories'
            fullWidth
            onKeyPress={handleKeyPress}
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}


          />
          <TextField
            name='search'
            variant='outlined'
            label='add tags seperated by ,'
            fullWidth
            onKeyPress={handleKeyPress}
            value={tags}
            onChange={(e)=>{setTags(e.target.value)}}
          />
          <Button onClick ={serachPost}> Search </Button>
      
        </Paper>
        </Grid>
      </Grid>
      <Posts  />
      {(!searchQuery && !tags.length) && <Paginate page={page} />}
    
    </Stack>
    
  )
}

export default Home