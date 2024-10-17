import { useState } from "react";
import { Container, TextField, Toolbar, Typography, Box, Avatar, Drawer, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import FoodBankIcon from '@mui/icons-material/FoodBank';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
const NavBar = () => {
  const[open, setIsOpen] = useState(false)

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
                alignItems:'center',
                gap:1
            }}>
              <MenuIcon onClick = {()=> setIsOpen(!open)}/>
                <Drawer
                open = {open}
                onClose = {()=>setIsOpen(false)}
                PaperProps={{
                  sx:{width:'10%', }
                }}
                >
                
                  </Drawer>
            <IconButton component = {Link} to = '/'>
            <FoodBankIcon fontSize="large"/>
            </IconButton>
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
          
          <IconButton>
            <EditNoteIcon fontSize="large"/>
            </IconButton> 

            <IconButton>
            <Avatar sx = {{
                width:28,
                height:28
            }}/>
            </IconButton>
     
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
