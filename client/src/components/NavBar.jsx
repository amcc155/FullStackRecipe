import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Button,
  AppBar,
 
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../context/AuthContext";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "react-router-dom";
import { useNavBarContext } from "./context/NavBarContext";

const DrawerList = () => {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to={user ? "/profile" : "/login"}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={user ? "Profile" : "Login"} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItem>
      </List>
    </Box>
  );
};

const NavBar = () => {
  const {toggleDrawer, open} = useNavBarContext()
  const isMedium = useMediaQuery("(min-width:768px)");


  const drawerWidth = 250;
  

  return (
    <Box sx={{ display: "flex" }}>
      {isMedium ?(
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: "white",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "white",
            },
          }}
        >
          <DrawerList />
        </Drawer>
      ):(

        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick = {()=> toggleDrawer(open)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
       <DrawerList/>
     </Drawer>
      </Box>
     
      )}
    </Box>
  );
};

export default NavBar;
