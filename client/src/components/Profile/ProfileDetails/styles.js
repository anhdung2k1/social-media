import {makeStyles} from '@mui/styles';

export default makeStyles((theme) => ({
  cover_url: {
        background: 'linear-gradient(90deg,rgba(0,258,247,1) 0%, rgba(206,3,184,1) 80%, rgba(0,212,255,1) 100%)',
        zIndex: 10,
        minHeight:'300px',
        width: '100%',
        height: '220px', 
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
  },
  cover_url_img: {
    zIndex: 10,
    minHeight:'300px',
    width: '950px',
    height: '220px', 
    objectFit: 'cover',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.4)'
},
  btn_cover: {
    display: 'flex',
    flexDirection: 'row',
    background: '#fff',
    width: '180px',
    height: '30px',
    borderRadius: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  }
}));