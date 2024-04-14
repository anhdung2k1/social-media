import React, {useState} from 'react';
import useStyles from './styles.js';
import {Box,Grow,Avatar, Button, Paper, Grid, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '../../assets/icons/padlock 1.png';
import Input from '../widgets/Input';
import {GoogleLogin } from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import * as actionType from '../../constants/actionTypes.js';
import NavbarAuth from '../Navbar/NavbarAuth/NavbarAuth';
import {signin,signup} from '../../actions/auth';

// import jwt from 'jsonwebtoken';

const initialState = { 
 userName : "",
 hashPassword: "",
 confirmPassword: "",
 email: ""
};
const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp && (formData.hashPassword === formData.confirmPassword)){
      dispatch(signup(formData,navigate));
    }
    else{
      dispatch(signin(formData,navigate));
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const googleSuccess = async (res) => {
      const result = jwt_decode(res.credential);
      // const token = jwt.sign({email: result?.email, id: result?.sub}, 'test', {expiresIn: "1h"});
      try{
        console.log(jwt_decode(res.credential));
        dispatch({type: actionType.AUTH, data: {result}});
        navigate("/posts");
      }catch(e){
        console.log(e);
      }
  }
  const googleError = () => {
    console.log("Google Error")
  }
  
  return (
    <Grow in>
      <Container component = "main" maxWidth = 'xl'>
      <NavbarAuth />
      <Container component = "main" maxWidth = "xs">
      <Paper className = {classes.paper} elevation = {3}>
        <Avatar className = {classes.avatar}>
          <img alt = "pad_lock" src = {LockOutlinedIcon} width = "30px" height = "30px"/>
        </Avatar>
        <Typography variant = "h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className = {classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing = {2}>
            {
              isSignUp &&(
                <>
                    <Input name = "userName" label = "User Name" handleChange = {handleChange} autoFocus/>
                </>
              )
            }
            <Input name = "email" label = "Email Address" handleChange = {handleChange} type = "email"/>
            <Input name = "hashPassword" label = "Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
            { isSignUp && <Input name = "confirmPassword" label = "Repeat Password" handleChange = {handleChange} type = "password"/>}
          </Grid>
          <div className = {classes.forgot_password} onClick = {() => navigate('/forgotPassword')}>
             Forgot password?
          </div>
          <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Box marginTop = '20px'>
            <GoogleLogin
              onSuccess = {googleSuccess}
              onError = {googleError}
              useOneTap
            />
          </Box>
          
        </form>
      </Paper>
    </Container>
    <Box marginLeft = '-4em' display='flex' justifyContent='center' alignItems='center'>
      <Button className = {classes.switch_mode} onClick = {switchMode}>
            {isSignUp ? 'Already have an account ? Sign In' : "New member? Join now"}
        </Button>
    </Box>    
      </Container>
    </Grow>
  )
}

export default Auth;