import {Radio, Box, FormControlLabel, Typography } from '@mui/material';
import React from 'react'

const Checkbox = ({icon,title,subtitle}) => {
  return (
    <Box marginLeft = '20px' marginTop = '20px' gap = "10px" width = "500px" display = 'flex' flexDirection = 'row' justifyContent = 'space-evenly' alignItems= 'center' sx = {{cursor: 'pointer', '&:hover': {background: 'whitesmoke'}}}>
        <Box display = 'flex' flexDirection = 'row' justifyContent = 'center' alignItems= 'center' sx = {{cursor: 'pointer'}}>
            <div style={{display: 'flex',width: '60px', height: '60px',borderRadius:'60px',background: 'whitesmoke', justifyContent: 'center', alignItems: 'center'}}>
                <img alt = "icon" src = {icon} width = '30px' height = '30px'/>
            </div>
            <Box display = 'flex' flexDirection = 'column' marginLeft = '4px'>
                <Typography fontSize = '16px' fontWeight= "600">{title}</Typography>
                <Typography variant='text.secondary'>{subtitle}</Typography>
            </Box>
        </Box>
        <Box width = "50px"/>
        <FormControlLabel value = {title} control = {<Radio />} />
    </Box>
  )
}

export default Checkbox;