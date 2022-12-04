import { Avatar, Container, Paper, Typography ,Box ,Grid, TextField, Button} from '@mui/material'
import React ,{useState} from 'react'
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../actions/posts';
import {  useNavigate } from 'react-router-dom';
import {signup,signin} from '../../actions/auth'

const Auth = () => {
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const [formData,setFormData]=useState(initialState);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isSignUp){
            dispatch(signup(formData,navigate))
        }else{
            dispatch(signin(formData,navigate))
        }

    }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
      
    }


    const handleShowPassword=()=>{
        setShowPassword((prevState)=> !prevState)
    }
    const switchMode=()=>{
            setIsSignUp((prevIsSignUp)=> !prevIsSignUp)
            setShowPassword(false)
    }
    const [isSignUp,setIsSignUp]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const googleSucess=async  (res)=>{
         const  token =await res?.credential
         const result =(jwt_decode(token))
        //  const data={token:token,result:result}
         try {
            // dispatch({type:"AUTH",data:{result,token}});
            dispatch(setAuthData({result,token}))
            navigate("/")
         } catch (error) {
            console.log(error)
         }
    }
    const googleFailure=()=>{
        console.log("try again something is wrong")
    }
  return (
    <Container component='main' maxWidth='xs' sx={{mt:"40px" }}>
        <Paper  elevation={3} >
        <Box sx={{display:'flex' ,justifyContent:"center" ,flexDirection:"column",alignItems:"center"}}>
        <Avatar sx={{mt:"20px"}}>
            <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp?"Sign Up" :"Sign In"}</Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit}>
        <Grid container>
                {
                    isSignUp &&(
                        <>
                            <Input name ='firstName' label="first Name" handleChange={handleChange} autoFocus half />
                            <Input name ='lastName' label="Last Name" handleChange={handleChange} autoFocus  half/>
                        </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type="email"/>
                <Input name="password" label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword} />
                {isSignUp && <Input name="confirmPassword" label='Repeat Password' handleChange={handleChange} type='password'  />}
        </Grid>
        <Box sx={{display:'flex'}} >
        <GoogleLogin  onSuccess={googleSucess} onError={googleFailure}  useOneTap />
        </Box>
        <Button sx={{p:'10px',mb:"10px"}}  type='submit'  variant='contained' >
            {isSignUp ?'Sign Up' : 'Sign In'}
        </Button>
        <Grid container justifyContent="flex-end" >
            <Grid item>
                <Button onClick={switchMode}>
                    {isSignUp ? 'Already have account ? Sign In' : "Dont't have an account "}
                </Button>
            </Grid>
        </Grid>
        </Box>
        </Paper>
    </Container>
  )
}

export default Auth