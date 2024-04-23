import React,{useState} from 'react';
import {Box,Stack,Typography,TextField,IconButton, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AddIcon from '@mui/icons-material/Add';
import FriendMessageCard from './FriendMessageCard';
import {useSelector} from 'react-redux';


// const ListFriendChat = ({user}) => {
//     const {rooms} = useSelector((state) => state.rooms);
//     const [search,setSearch] = useState({search: ''});
//     const handleChange = (e) => {
//       setSearch({...search,[e.target.name]: e.target.value});
//     }
//     const handleSubmit = (e) => {
//       if(e.keyCode === 13 || e.key === 'Enter'){
//         console.log(search);
//       }
//     }
//     if(!rooms) return "No room found";
//     console.log(rooms);
//   return (
//     <Box flex = {1} p = {1} sx = {{background: '#535151', height: 1000}}>
//         <Stack direction = 'column' justifyContent = 'space-between'>
//           {/*Search*/}
//           <Box p = {1} display = 'flex' flexDirection = 'row' sx = {{background: '#6D6767', width: '90%',height: '60px',borderRadius: '5px',color: 'white'}}>
//             <TextField name = "search" label = {<Typography variant = 'body1' fontSize = '16px'>Search</Typography>} onChange = {handleChange} />
//             <IconButton onClick = {handleSubmit}><SearchIcon color = 'primary' fontSize = 'large'/></IconButton>
//           </Box>
//           {/*Friends */}
//           <Box display = 'flex' flexDirection = 'row' justifyContent = 'start' alignItems = 'center' marginTop = '10px' sx = {{background: '#B5B5B5', width: '90%', borderRadius: '10px', height: '60px',gap: 3, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
//             <GroupOutlinedIcon fontSize = "large" sx = {{marginLeft: 4, fontSize: 40}}/>
//             <Typography variant="body1" color="#535151">Friends</Typography>
//           </Box>
//           <Stack direction = 'row' justifyContent = 'space-between' sx = {{marginTop: 2}}>
//             <Typography variant = "body2" color = "#D9D9D9" sx = {{marginTop: '10px', marginLeft: '5px'}}>DIRECT MESSAGE</Typography>
//             <Button variant = 'contained' onClick = {null} sx = {{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 35, heigh: 60, borderRadius: 60}}>
//               <AddIcon />
//             </Button>
//           </Stack>
//           {/**Friend Message Card*/}
//           {rooms.map((room) => (
//             <FriendMessageCard key = {room.convId} user = {user} room = {room}/>
//           ))}
//         </Stack>
//     </Box>
//   )
// }
// Mock Default Friend Data
const ListFriendChat = ({ user }) => {
  const { rooms } = useSelector((state) => state.rooms);
  const [search, setSearch] = useState({ search: '' });
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      console.log(search);
    }
  };

  //Define default friend here
  const defaultFriend = {
    user_id: '0',
    userName: 'Default Friend',
    avatar_url: 'path_to_default_avatar_image.jpg',
  };
  if (!rooms) return "No room found";

  return (
    <Box flex={1} p={1} sx={{ background: '#535151', height: 1000 }}>
      <Stack direction='column' justifyContent='space-between'>
        {/* Search */}
        <Box p={1} display='flex' flexDirection='row' sx={{ background: '#6D6767', width: '90%', height: '60px', borderRadius: '5px', color: 'white' }}>
          <TextField name='search' label={<Typography variant='body1' fontSize='16px'>Search</Typography>} onChange={handleChange} />
          <IconButton onClick={handleSubmit}><SearchIcon color='primary' fontSize='large' /></IconButton>
        </Box>
        {/* Friends */}
        <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center' marginTop='10px' sx={{ background: '#B5B5B5', width: '90%', borderRadius: '10px', height: '60px', gap: 3, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
          <GroupOutlinedIcon fontSize="large" sx={{ marginLeft: 4, fontSize: 40 }} />
          <Typography variant="body1" color="#535151">Friends</Typography>
        </Box>
        <Stack direction='row' justifyContent='space-between' sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="#D9D9D9" sx={{ marginTop: '10px', marginLeft: '5px' }}>DIRECT MESSAGE</Typography>
          <Button variant='contained' onClick={null} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 35, heigh: 60, borderRadius: 60 }}>
            <AddIcon />
          </Button>
        </Stack>
        {/**Friend Message Card*/}
        {rooms.map((room) => (
          <FriendMessageCard key={room.convId} user={user} room={room} />
        ))}
        {/* Display Default Friend */}
        <FriendMessageCard key={defaultFriend.user_id} user={user} room={{ sendUser: defaultFriend }} />
      </Stack>
    </Box>
  );
};
export default ListFriendChat
