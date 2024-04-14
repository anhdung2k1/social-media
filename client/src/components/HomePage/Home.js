import React,{useState} from 'react';
import {Box,Grow,Typography,Container, Grid, Paper,Button} from '@mui/material';
import {Link,useNavigate} from 'react-router-dom';
import {GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import img_bg from '../../assets/images/background_img_1.png';
import img_bg2 from '../../assets/images/background_2.png';
import img_bg3 from '../../assets/images/background_3.png';
import img_bg4 from '../../assets/images/background_4.png';
import social from '../../assets/icons/Group 12.png';
import arrow from '../../assets/icons/Group 15.png';
import writing from '../../assets/icons/writing 1.png';
import lightBub from '../../assets/icons/light-bulb 1.png';
import watchMovie from '../../assets/icons/watch-movie 1.png';
import distributed from '../../assets/icons/distributed 1.png';
import lineBreak from '../../assets/icons/Line 2.png';
import * as actionType from '../../constants/actionTypes'; 
import useStyles from './styles.js';
import Input from '../widgets/Input';
import CardMem from '../widgets/CardMem';
import NavBarHome from '../Navbar/NavbarHome/NavbarHome';
import {signin} from '../../actions/auth';

const initialState = { 
  hashPassword: "",
  email: ""
 };

const Home = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Using dispatch redux the set Log in
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData,navigate));
    window.location.reload(false);
  }
  // Split the previous fromData and add new target value into target name 
  const handleChange = (e) => { 
    setFormData({...formData, [e.target.name]: e.target.value}); 
  }
  //Control the show password behavior
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const googleSuccess = async (res) => {
    const result = jwt_decode(res.credential);
    // const token = jwt.sign({email: result?.email, id: result?.sub}, 'test', {expiresIn: "1h"});
    try{
      console.log(result);
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
       <Container component = "main" maxWidth = "xl">
       <NavBarHome />
       <Grid container spacing = {{xs: 2, md: 3}} columns ={{xs: 4, sm: 8, md: 12}}>
        <Grid item xs = {6} md = {6} sm = {3}>
        <div className = {classes.root}><span>Welcome to your memories social</span><div>media community</div></div>
          <div className = {classes.container_login}>
            <Paper className = {classes.paper} elevation = {3}>
              <form className = {classes.form} onSubmit = {handleSubmit}>
                <Grid item container spacing = {1}>
                  <Input name = "email" label = "Enter your Email" handleChange = {handleChange} type = "email" autoFocus/>
                  <Input name = "hashPassword" label = "Enter your Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword} autoFocus/>
                    <Link to = '/forgotPassword' className = {classes.forgot_password}>
                      <Typography variant = "h6">Forgot password?</Typography>
                    </Link>
                      <Button type = "submit" fullWidth variant = "contained" color = "primary" className = {classes.submit}>
                        Sign In
                      </Button>
                    <div>
                      <img alt = "icon" className = {classes.lineBreak} src = {lineBreak}/>
                        <span className = {classes.breakName}>Or</span>
                      <img alt = "icon" className = {classes.lineBreak} src = {lineBreak}/>
                    </div>
                    <div className = {classes.btnGoogle}>
                      <Paper elevation = {3}>
                          <GoogleLogin
                            onSuccess = {googleSuccess}
                            onError = {googleError}
                            auto_select
                            useOneTap
                            />
                        </Paper>
                      </div>
                  </Grid>
                </form>
              </Paper>
            </div>
          </Grid>
          <Grid item xs = {4}>
            <img className = {classes.img_bg_1} alt = "image_bg" src = {img_bg} width = "800px"/>
          </Grid>
        </Grid>
        <Container className = {classes.spacing}/>
        <Typography className = {classes.root} variant = "h3">
          <span className = {classes.span_memories}>
            Explore your world
          </span>
          <div>
            with Memories
          </div>
        </Typography>
        <Grid item container spacing = {1}>
          <CardMem text = "Share your stories" img = {img_bg2}/>
          <CardMem text = "Connect to community" img = {img_bg3}/>
          <CardMem text = "Any times, any where" img = {img_bg4}/>
        </Grid>
        <Container className = {classes.spacing_2}/>
        <Container component = "main" maxWidth = 'xl'  className = {classes.container_bg_3}>
              <Typography className = {`${classes.root} ${classes.text_bg_3}`} variant = "h3"><span className = {classes.span_memories}>World of </span><span>Memories</span></Typography>
              <Typography className = {classes.text_bg_3} variant = "h6">Access from 120+ countries around the world.<div>Let's start your memories</div></Typography>
              <img className = {classes.img_bg_3} alt = "img_bg_3" src = {social}/>
              <Box marginBottom = '40px' display = 'flex' justifyContent='center' alignItems='center'>
                <Button size = "large" variant = "contained" color = "primary" onClick = {()=> navigate('/auth')}>Get Started</Button>
              </Box>
        </Container>
        <Container className = {classes.padding_bg_3}/>
        <Grid container spacing = {4}>
          <Grid item xs = {4}>
            <Typography noWrap className = {classes.text_bg_4} variant = "h4">
              Our process
            </Typography>
            <Typography align = 'justify' className = {classes.text_bg_4} noWrap variant = "h3">This is the world<div>sharing for you</div></Typography>
            <Typography variant = "h5" noWrap>This is the world where you are<div>shine if you are ready right now</div></Typography>
            <Box marginTop = '20px'>
              <Button size = 'large' variant = 'contained' color = 'secondary' onClick = {() => navigate('/auth')}>Discover more<img className = {classes.btn_icon_bg_4} alt = 'icon_btn_bg_4' src ={arrow}/></Button>
            </Box>
          </Grid>
          <Container component = "main" maxWidth = 'sm'>
            <Box className = {classes.bg_img_5} >
            <Grid item xs = {6}>
            <Grid container rowSpacing= {4} spacing = {8}>
              <Grid item xs = {6} md = {8}>
                <Container component = 'main'>
                  <div className = {classes.box}>
                    <div className = {classes.circle_num}>
                      <div className = {classes.textCircle}>
                        1
                      </div>
                    </div>
                    <img className = {classes.img_process} alt = "img_note" src = {writing} width = "100px" height = "100px"/>
                    <div className = {classes.text_process}>Put down your world inside a memory</div>
                </div>
                </Container>
              </Grid>
              <Grid item xs = {6} md = {4}>
              <Container component = 'main'>
                <div className = {classes.box}>
                      <div className = {classes.circle_num}>
                        <div className = {classes.textCircle}>
                          2
                        </div>
                      </div>
                      <img className = {classes.img_process} alt = "img_note" src = {lightBub} width = "100px" height = "100px"/>
                      <div className = {classes.text_process}>Thinking actively to contribute social network</div>
                  </div>
                </Container>
              </Grid>
              <Grid item xs = {6} md = {8}>
                <Container component = 'main'>
                  <div className = {classes.box}>
                      <div className = {classes.circle_num}>
                        <div className = {classes.textCircle}>
                          3
                        </div>
                      </div>
                      <img className = {classes.img_process} alt = "img_note" src = {watchMovie} width = "100px" height = "100px"/>
                      <div className = {classes.text_process}>Follow all of the footsteps memorable</div>
                  </div>
                </Container>
              </Grid>
              <Grid item xs = {6} md = {4}>
              <Container component = 'main'>
                <div className = {classes.box}>
                      <div className = {classes.circle_num}>
                        <div className = {classes.textCircle}>
                          4
                        </div>
                      </div>
                      <img className = {classes.img_process} alt = "img_note" src = {distributed} width = "100px" height = "100px"/>
                      <div className = {classes.text_process}>Connect with many people inside the container</div>
                  </div>
              </Container>
              </Grid>
            </Grid>
            </Grid>
            </Box>
          </Container>
        </Grid>
       </Container>
    </Grow>
  )
}

export default Home;