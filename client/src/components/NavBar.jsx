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
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user } = useAuth();
  const [open, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: { width: 250, backgroundColor:'white'},
        }}
      >
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default NavBar;