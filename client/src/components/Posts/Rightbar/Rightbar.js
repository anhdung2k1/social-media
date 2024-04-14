import React,{useState} from 'react';
import {Paper,Box,AppBar,TextField,Button} from '@mui/material';
import useStyles from './styles';
import {useNavigate} from 'react-router-dom';
import {getPostsBySearch} from '../../../actions/posts';
import {useDispatch} from 'react-redux';
import PostPagination from '../PostPagination/PostPagination';

const Rightbar = ({page}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useState('');
    const searchPost = () => {
        if(search.trim()){
            console.log(search);     
            dispatch(getPostsBySearch(String(search)));
            navigate(`/posts/search?keyword=${search}`)
        }
        else{
            navigate(`/posts`);
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode === 13 || e.key === 'Enter'){
            e.preventDefault();
            searchPost();
        }
    }
    const classes = useStyles();
    return (
        <>
            <AppBar className = {classes.appBarSearch} position = "fixed" color = "inherit" sx = {{width :"300px", height: "200px", right: 80,top: 120}}>
            <TextField 
                name = "search" 
                variant = "outlined" 
                label = "Search Memory" 
                onKeyPress = {handleKeyPress}
                fullWidth 
                multiline
                value = {search} 
                onChange = {(e) => setSearch(e.target.value)}
            />
            <Box height = '12px'/>
            <Button
                className = {classes.searchButton}
                onClick = {searchPost}
                variant = "contained"
                color = "primary"
            >
                Search
            </Button>
            <Paper elevation = {6} sx = {{marginTop: 2}}>
                <PostPagination page = {page} />
            </Paper>
            </AppBar>
            
    </>
    )
}

export default Rightbar
