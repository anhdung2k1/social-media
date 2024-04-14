import React, { useState,useEffect } from "react";
import {
  AppBar,
  Typography,
  Box,
  Badge,
  IconButton,
  Avatar,
  Tooltip,
  InputAdornment,
  Autocomplete,
  TextField,
  createFilterOptions
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import memoriesLogo from "../../../assets/icons/memories-Logo.png";
import useStyles from "./styles";
import {
  StyledToolbar,
  UserBox,
} from "../../widgets/Styles";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch,useSelector } from "react-redux";
import * as actionType from "../../../constants/actionTypes";
import {getRequestByReceiveUserId} from '../../../actions/friendRequest';
import {getPostsBySearch} from '../../../actions/posts';
import {getSearchRecentsByUserId,createSearchRecent} from '../../../actions/search';

const NavbarPost = ({ user, setUser, userProfile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const openProfile = () => {
    navigate(`/profile/${user?.user_id || user?.result.sub}`);
  }
  const openFriendPage = () => {
    navigate("/friends");
  };
  const openMessage = () => {
    navigate("/message");
  };
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate("/auth");
    setUser(null);
  };
  const [search,setSearch] = useState('');
  const handleKeyPress = (e) => {
    if(e.keyCode === 13 || e.key === 'Enter'){
        e.preventDefault();
        searchPost();
    }
  }
  const searchPost = () => {
    if(search.trim()){
        console.log(search);     
        dispatch(getPostsBySearch(String(search)));
        dispatch(createSearchRecent(user.user_id, {keyword: String(search)}))
        navigate(`/posts/search?keyword=${search}`);
    }
    else{
        navigate(`/`);
    }
  }
  const options = [];
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  }
  useEffect(() => {
    dispatch(getRequestByReceiveUserId(user?.user_id));
    dispatch(getSearchRecentsByUserId(user?.user_id));
  },[dispatch,user?.user_id]);
  const {request} = useSelector((state) => state.requests);
  const {searchUser} = useSelector((state) => state.searches);
  if(!request) {return "No requests";}
  if(!searchUser) {return "No Search Recents";}
  searchUser.forEach((sub) => options.push({title: sub.keyword}));
  request.forEach((rq) => options.push({title: rq.sendUser.userName}));

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <StyledToolbar>
        <Box display="flex" flexDirection="row" gap="20px" alignItems="center">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/posts">
              <img src={memoriesLogo} alt="icon" height="60px" />
            </Link>     
          </Box>
            {/*SEARCH*/}
            <Autocomplete
              sx = {{width: '300px'}}
              options={options}
              filterOptions = {filterOptions}
              onChange= {(event,value) => console.log(setSearch(value.title))}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue = {(option,value) => option.value === value.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  variant="outlined"
                  onKeyPress = {handleKeyPress}
                  multiline
                  value = {search}
                  onChange = {(e) => setSearch(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.root
                    }
                  }}
                />
              )}
            />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <div className={classes.header_middle}>
            <div className={classes.header_option}>
              <IconButton component={Link} to="/posts">
                <HomeIcon fontSize="large" />
              </IconButton>
            </div>
            <div className={classes.header_option}>
              <IconButton component={Link} to="/friends">
                <GroupsIcon fontSize="large" />
              </IconButton>
            </div>
            <div className={classes.header_option}>
              <Badge badgeContent={2} color="error">
                <IconButton component={Link} to="/message">
                  <SmsOutlinedIcon fontSize="large" />
                </IconButton>
              </Badge>
            </div>
          </div>
        </Box>
        <div className={classes.header_right}>
          <div className={classes.header_info}>
            <IconButton onClick = {() => navigate(`/notification`)}>
              <Badge badgeContent={null} color="error">
                <NotificationsNoneIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton onClick = {() => navigate("/friendRequest")}>
              <Badge badgeContent={request.filter((rq) => rq.isAccepted === 0).length} color="error">
                <PeopleAltIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Tooltip title={user?.result.name}>
                <IconButton onClick={openProfile}>
                  <Avatar
                    alt={user?.result.name}
                    src={user?.result.picture || userProfile?.avatar_url}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <UserBox>
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"Profile"} onClick={openProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key={"Settings"} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem key={"Friends"} onClick={openFriendPage}>
                  <Typography textAlign="center">Friends</Typography>
                </MenuItem>
                <MenuItem key={"Message"} onClick={openMessage}>
                  <Typography textAlign="center">Message</Typography>
                </MenuItem>
                <MenuItem key={"Log Out"} onClick={logout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </UserBox>
          </div>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavbarPost;
