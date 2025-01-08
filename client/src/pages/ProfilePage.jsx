import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const[latestRecipes, setlatestRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => { 
        try{
            const response = await axios.get("http://localhost:3001/user/recipes", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            console.log(response.data);
            const length = response.data.recipes.length;
            setlatestRecipes(response.data.recipes.slice(length - 3, length));
        }catch(err){
            console.error(err)

        }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <p> Loading </p>
      ) : (
        <Container
          sx={{
            height: "calc(100dvh - 150px)",
            maxHeight:'1000px',
            borderRadius: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            mt: 5,
            pl: 7,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mt: 2,
              }}
            >
              {" "}
            </Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h2"> {user?.username} </Typography>
              <Typography> Date Joined: Date </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: "80%",
              backgroundColor: "red",
              mt: 2,
              mb: 100,
              display: "flex",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{ width: "300px", height: "90%", textAlign: "center" }}
              elevation={3}
            >
              <Typography
                sx={{ textDecoration: "none", color: "white" }}
                component={Link}
                to="/user/recipes"
              >
                {" "}
                Latest Recipes{" "}

              </Typography>
              <Container sx = {{height: '100%', display: 'flex', alignItems:'center', flexDirection: 'column', gap: 2}}>
              {latestRecipes.map((recipe) => (
                <Box sx = {{width:'70%', height:'25%', objectFit:'cover'}}component={Link}  to = {`/recipe/${recipe.id}`} key = {recipe.id}>
                <Box
                component='img'
                sx = {{width:'100%', height:'100%', objectFit:'cover'}}
                src = {recipe.imageurl}
                />
                </Box>
            
              ))}
               </Container>
            </Paper>
           
            <Paper
              sx={{ width: "300px", height: "90%", textAlign: "center" }}
              elevation={3}
            >
              <Typography
                sx={{ textDecoration: "none", color: "white" }}
                component={Link}
                to="/user/recipes"
              >
                {" "}
                Recent Reviews{" "}
              </Typography>
            </Paper>
            <Paper
              sx={{ width: "300px", height: "90%", textAlign: "center" }}
              elevation={3}
            >
              <Typography
                sx={{ textDecoration: "none", color: "white" }}
                component={Link}
                to="/user/recipes"
              >
                {" "}
                Latest Recipes{" "}
              </Typography>
            </Paper>
          </Box>

          <Button
            sx={{ position: "absolute", bottom: 20, right: 20 }}
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </Button>
        </Container>
      )}
    </>
  );
};
export default ProfilePage;
