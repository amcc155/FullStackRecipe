import { Container, TextField, Toolbar, Typography, Box, Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import EditNoteIcon from '@mui/icons-material/EditNote';
const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar  sx = {{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
        }}disableGutters>
            <Box sx = {{
                display:'flex',
                alignItems:'center'
            }}>
            <FoodBankIcon fontSize="large"/>
            <Typography fontSize = 'large' sx = {{
                ml:1
            }}> Recipe </Typography>
            </Box>
            <TextField sx = {{
                flexGrow:1,
                maxWidth:'300px'
            }}/>
            <Box sx = {{
                display:'flex',
                alignItems:'center',
                gap:2
            }}>
          
            <EditNoteIcon fontSize="large"/>
            <Avatar sx = {{
                width:28,
                height:28
            }}/>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
