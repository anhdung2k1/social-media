import React from 'react';
import {Box, CardContent, CardMedia,ButtonBase} from '@mui/material';

const ProfileCard = ({handleAvatarImage,avatarUrl,marginTop}) => {
  return (
    <Box sx = {{
            boxShadow:'none',
            borderRadius:'20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:{xs: '356px',md: '320px'},
            height: '326px',
            margin:'auto',
            marginTop: marginTop,
    }}>
      <ButtonBase onClick = {handleAvatarImage}>
        <CardContent sx = {{display: 'flex', justifyContent: 'center', color: '#fff', objectFit: 'cover'}}>
          <CardMedia image = {avatarUrl || "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png"}
            alt = "Profile Card"
            sx={{borderRadius: '50%',height: '180px',width: '180px',mb:2,border:'1px solid #e3e3e3'}}
          />
        </CardContent>
      </ButtonBase>
    </Box>
  )
}

export default ProfileCard;
