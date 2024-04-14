import React  from 'react';
import {Link} from 'react-router-dom';
import {AppBar} from '@mui/material';
import useStyles from './styles.js';
import memoriesLogo from '../../../assets/icons/memories-Logo.png';
import memoriesText from '../../../assets/icons/memories-Text.png';

const NavbarAuth = () => {
  const classes = useStyles();
  return (
    <AppBar className = {classes.appBar} position="static" color="inherit">
        <Link to = "/"> 
            <img src={memoriesLogo} alt="icon" height="40px"/>
            <img className = {classes.imageText} src = {memoriesText} alt = "icon" height = "40px" />
        </Link>   
    </AppBar>
  )
}

export default NavbarAuth;

