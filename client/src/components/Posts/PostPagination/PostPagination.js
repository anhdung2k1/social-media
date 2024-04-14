import React,{useEffect} from 'react'
import {Pagination, PaginationItem} from '@mui/material';
import {Link} from 'react-router-dom';
import {getPosts} from '../../../actions/posts';
import {useSelector,useDispatch} from 'react-redux';

const PostPagination = ({page}) => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts); 
    useEffect(() => {
        if(page) {
            dispatch(getPosts(page));
        }
    },[dispatch,page]);
    return (
        <Pagination
            sx = {{justifyContent: 'space-around', borderRadius: 5}}
            count={posts.totalPages}
            page={Number(page) || 0}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?pageNo=${item.page}`} />
      )}
    />
    )
}

export default PostPagination
