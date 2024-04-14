import {makeStyles} from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
          },
        color: '#8F5849',
        marginLeft: '20px',
        marginBottom: '20px',
        fontSize: '48px',
        fontFamily: 'Inter',
        [theme.breakpoints.down('sm')] : {
            flexDirection: 'column',
            margin: theme.spacing(2),
            fontSize: '36px',
        }
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    container_login: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '40%',
    },
    spacing: {
        marginTop: theme.spacing(12),
        [theme.breakpoints.down('md')] : {
            marginTop: theme.spacing(40),
        },
        [theme.breakpoints.down('sm')] : {
            width: '100%',
            marginTop: theme.spacing(50),
        }
    },
    spacing_2: {
        marginTop: theme.spacing(10),
    },
    forgot_password: {
        margin: theme.spacing(1,1),
        textDecoration: 'none',
        color: '#000',
    },
    submit: {
        marginLeft: theme.spacing(2),
        borderRadius: 20,
        height: '45px',
    },
    lineBreak: {
        margin: '4% 5% 1% 8%',
        width: '35%'
    },
    breakName: {
        fontSize: 20,
        color: '#A9A9A9'
    },
    btnGoogle: {
        margin: theme.spacing(2, 3, 2),
        borderRadius: 20,
        height: '40px',
    },
    span_memories: {
        color: '#000000'
    },
    card_mem: {
        width: '100%',
        height: '100%',
        marginTop: '10px',
    },
    img_bg_1:{
        width: '140%',
        height: '100%',
        paddingLeft: theme.spacing(9)
    },
    container_bg_3: {
        backgroundColor: "#E6E6FA",
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: 'auto',
        margin: theme.spacing(2,-20),
    },
    text_bg_3: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
        fontFamily: 'Inter',
    },
    img_bg_3 : {
        marginLeft: '38%',
        marginTop: '10px',
        marginBottom: '50px',
        width: '350px',
        height: "50%"
    },
    padding_bg_3: {
        marginTop: theme.spacing(120),
    },
    text_bg_4: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
          },
        color: '#8F5849',
        marginLeft: '20px',
        marginTop: '10px',
        fontFamily: 'Inter',
        fontWeight: 'normal',
    },
    btn_icon_bg_4: {
        marginLeft: '20px',
        width: '50px',
        height: '50px',
    },
    bg_img_5: {
        marginLeft: '300px',
        marginTop: '15%',
        width: '150%',
        height: '200px',
        backgroundColor: '#8F5849',
        opacity: '95%'
    },
    box: {
        width: '220px',
        height: '250px',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: '-180px',
        marginLeft: '20px',
        marginBottom: '180px',
        display: 'flex',
    },
    circle_num: {
        display: 'flex',
        borderRadius: 60,
        width: '30px',
        height: '30px',
        backgroundColor: '#8F5849',
        marginLeft: '15px',
        marginTop: '10px',
    },
    textCircle: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: '5px',
        marginLeft: '10px',
    },
    img_process: {
        margin: theme.spacing(6,2),
    },
    text_process: {
        display: 'flex',
        marginTop: '170px',
        marginLeft: '-160px',
        width: '180px',
        fontSize: '20px',
        textAlign: 'center',
        fontWeight: '500',
        color: '#8F5849',
    },
}));