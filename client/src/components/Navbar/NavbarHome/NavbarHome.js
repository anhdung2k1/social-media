import React,{useState} from 'react';
import {Menu,MenuItem,Tooltip,IconButton,Box,AppBar, Typography, Button, Toolbar} from '@mui/material'; 
import {Link} from 'react-router-dom';
import memoriesLogo from '../../../assets/icons/memories-Logo.png';
import memoriesText from '../../../assets/icons/memories-Text.png';
import compass from '../../../assets/icons/compass 1.png';
import memorable from '../../../assets/icons/research 1.png';
import sharing from '../../../assets/icons/mental-health 1.png';
import {Icons,UserBox,StyledToolbar} from '../../widgets/Styles';
import useStyles from './styles.js';
import MenuIcon from '@mui/icons-material/Menu';

const NavBarHome = () => {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className = {classes.appBar} position = "static" color = "inherit">
        <StyledToolbar>
            <Link to = '/' className = {classes.brandContainer}>
                <img className = {classes.image} src={memoriesLogo} alt="icon"/>
                <img className = {classes.image} src = {memoriesText} alt = "icon" />
            </Link>
            <Icons>
                <Link to = '/discover' className = {classes.iconText}>
                    <img className = {classes.icon} src = {compass} alt= "icon" />
                    <Typography className = {classes.menuText} variant ="h6">Discover</Typography>
                </Link>
                <Link to = '/memorable' className = {classes.iconText}>
                    <img className = {classes.icon} src = {memorable} alt= "icon" />
                    <Typography className = {classes.menuText} variant ="h6">Memorable</Typography>
                </Link>
                <Link to = '/sharing' className = {classes.iconText}>
                    <img className = {classes.icon} src = {sharing} alt= "icon"  />
                    <Typography className = {classes.menuText} variant ="h6">Sharing</Typography>
                </Link>
            </Icons>   
            <Box sx={{display: {xs: 'none',md: 'block'}}}>
                <Toolbar>
                    <Button size = "medium" sx = {{width: 110}} color = "primary" component = {Link} to = "/auth"  >Join now</Button>
                    <Button size = "medium" sx = {{width: 110}} variant = "contained" color = "primary" component = {Link} to = "/auth">Sign In</Button>
                </Toolbar>
            </Box>
            <UserBox>
                <IconButton onClick = {null}>
                <Box>
                  <Tooltip title = "Settings">
                    <IconButton onClick = {handleOpenUserMenu} sx = {{p: 0}}>
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                        <MenuItem key={"Discover"} component = {Link} to ='/discover'>
                          <Typography textAlign="center">Discover</Typography>
                        </MenuItem>
                        <MenuItem key={"Memorable"} component = {Link} to ='/memorable'>
                          <Typography textAlign="center">Memorable</Typography>
                        </MenuItem>
                        <MenuItem key={"Sharing"} component = {Link} to ='/sharing'>
                          <Typography textAlign="center">Sharing</Typography>
                        </MenuItem>
                        <MenuItem key={"Join now"} component = {Link} to ='/auth'>
                          <Typography textAlign="center">Join now</Typography>
                        </MenuItem>
                        <MenuItem key={"Sign In"} component = {Link} to ='/auth'>
                          <Typography textAlign="center">Sign In</Typography>
                        </MenuItem>
                    </Menu>
              </Box>
                </IconButton>
            </UserBox>
        </StyledToolbar>
       
    </AppBar>
  )
}

export default NavBarHome;
