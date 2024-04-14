import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    outside_container: {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        width: '100%',
        height: 'auto',
        marginLeft: '-40px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
    },
    inner_container: {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        backgroundColor: '#7967E5',
        width: '100%',
        height: '90px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '40px'
    },
    lineBreak: {
        width: '100%',
        opacity: '0.2',
        marginTop: '20px'
    },
    recently: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '45px',
        gap: '10px',
        paddingBottom: '10px'
    }
}));