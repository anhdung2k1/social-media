import {makeStyles,alpha} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 30,
        margin: '30px 0',
        // height: '120px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        padding: '10px 50px',
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
    },
    image: {
        width: '90px',
        height: 'auto'
      },
    toolbar: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          width: 'auto',
        },
    },
    brandContainer: {
        alignItems: 'center',
    },
    menuText: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: 300,
        color: "#000042",
        fontStyle: "bold",
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.25)
        }
    },
    icon: {
        marginLeft: '10px',
        marginTop: '15px',
        maxHeight: '50px',
        maxWidth: '40px',
        width:'100%',
        height: 'auto',
    },
    iconText: {
        marginLeft: theme.spacing(4),
        textDecoration: 'none',
        width: '100%',
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.25)
        }
    },
}));