import React from "react";
import {
  FormControlLabel,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GroupsIcon from "../../../assets/icons/group.png";
import GroupIcon from "../../../assets/icons/friend.png";
import FeedIcon from "../../../assets/icons/most_recent.png";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import lineBreak from "../../../assets/icons/Line 2.png";
import { MaterialUISwitch } from "../../widgets/Styles";
import LogoutIcon from "../../../assets/icons/logout.png";
import { useDispatch } from "react-redux";
import * as actionType from "../../../constants/actionTypes";

const Sidebar = ({ mode, setMode, user, setUser, userProfile }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({type: actionType.LOGOUT});
    navigate("/auth");
    setUser(null);
  };
  return (
    <Box flex = {1} p={1} sx={{display: {xs: 'none',md: 'block', marginLeft: '-20px'}}}>
      <Box position = 'fixed' width = '220px'>
      <Box className = {classes.outside_container} backgroundColor = {mode === 'light' ? 'white' : 'rgba(0,0,0,0.6)'}>
        <div className = {classes.inner_container}>
            <Tooltip title = {user?.result.name}>
              <div className = {classes.profile}>
                <IconButton onClick = {() => navigate(`/profile/${user?.user_id || user?.result.sub}`)}>
                 <Avatar alt = {user?.result.name} src = {user?.result.picture || userProfile?.avatar_url} sx = {{width: 60,height: 60}}/>
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Box
            flexDirection="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="28px"
          >
            <Typography
              variant="h6"
              fontSize="22px"
              fontWeight="400"
              fontFamily="Helvetica"
            >
              {user?.result.given_name || userProfile?.userName || "No Name"}
            </Typography>

            <img alt="icon" className={classes.lineBreak} src={lineBreak} />
          </Box>
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/friends">
                <ListItemIcon>
                  <img alt="icon" src={GroupIcon} width="40px" />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon onClick={() => navigate("/posts")}>
                  <img alt="icon" src={FeedIcon} width="40px" />
                </ListItemIcon>
                <ListItemText primary="Views" />     
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to="/friends">
                <ListItemIcon>
                  <img alt="icon" src={GroupsIcon} width="40px" />
                </ListItemIcon>
                <ListItemText primary = "Groups"/>
              </ListItemButton>  
          </ListItem>
          <ListItem>
            <ListItemButton onClick = {logout}>
              <ListItemIcon>
                <img alt = 'icon' src ={LogoutIcon} width = '40px'/>
              </ListItemIcon>
              <ListItemText primary = "Log out"/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick = {()=>setMode(mode === 'light' ? 'dark' : 'light')} >
              <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                  label="Theme"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
