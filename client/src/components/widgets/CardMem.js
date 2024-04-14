import React from 'react'
import {Grid, Container, Paper, Typography} from '@mui/material';
import useStyles from '../HomePage/styles';
const CardMem = ({text, img}) => {
  const classes = useStyles();
  return (
    <Grid xs = {4}>
    <Container  component = "main" maxWidth = "md" >
      <Paper className = {classes.paper} elevation = {2}>
        <Typography variant = "h6">{text}</Typography>
          <img className = {classes.card_mem} alt = "img_bg_2" src = {img} />
      </Paper>
    </Container>
  </Grid>
  )
}

export default CardMem
