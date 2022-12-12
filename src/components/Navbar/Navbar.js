import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../images/logo.svg';
import {AppBar,Popover,Box,Avatar, Button} from "@mui/material"
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/posts';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
const Navbar = () => {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const navigate= useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token=user?.token;
   if (token){
     const decodedToken = decode(token)
    
     if (decodedToken.exp*1000<new Date().getTime()) logout();
   }
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  const logout=()=>{
    dispatch(logOut());
    navigate("/")
    setUser(null)
    setAnchorEl(null);
  }
  
  return (
    <AppBar position ='static' color="inherit" >
    <Box sx={{display:"flex" ,flexDirection:"row" ,justifyContent:'space-between',alignItems:'center',m:"10px"}}>
    <Box component={Link} to="/"><Box  sx={{width:"140px"}}component='img' alt='logo' src={logo}/></Box>
    
    
      <Box sx={{pr:'12px', display:"flex" ,flexDirection:"row" }}>
      {user&&<Form/>}
      {user ? 
      
      <Box sx={{display:'flex',flexDirection:"row"}}>
      
      <Avatar onClick={handleClick} alt={user.result.name} src={user.result.picture}> {user.result.name.charAt(0)}</Avatar> 
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button onClick={logout} variant="text">LogOut</Button>
      </Popover>
      </Box>
      :
       <Button component={Link} to="/auth" variant="text">SignIn</Button>}
      </Box>
      
    </Box>
    
    </AppBar>
  )
}

export default Navbar