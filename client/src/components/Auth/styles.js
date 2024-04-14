import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn:{
    margin: theme.spacing(1, 0 , 1),
    backgroundColor: '#03a9f4',
  },
  forgot_password: {
    margin: theme.spacing(2,0),
    textDecoration: 'none',
    fontSize: '20px',
    fontFamily: 'Helvetica',
    color: '#000',
    cursor: 'pointer',
  },
  switch_mode: {
    fontSize: '18px',
    fontFamily: 'Inter',
    fontWeight: 'normal',
    alignItems: 'center',
    display: 'flex',
    marginLeft: theme.spacing(20)
  }
}));