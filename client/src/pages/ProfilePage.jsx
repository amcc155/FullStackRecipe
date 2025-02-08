import React, { useState, useEffect } from "react";
import {
  
  Box,
  Container,
  Typography,
 
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
  Rating,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "./ProfilePage/UserInfo";
import TabMenu from "./ProfilePage/TabMenu";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [latestData, setLatestData] = useState({ Saved: [], Reviews: [] });
  const [tabValue, setTabValue] = useState("Saved");

 

  const fetchReviews = ()=> axios.get("http://localhost:3001/user/reviews", {
    headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
  }).then(response => response.data.reviews)

  const fetchSaved = ()=> axios.get("http://localhost:3001/user/recipes", {
    headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
  }).then(response => {

   return response.data.recipes
 })

  useEffect(() => {
    Promise.all([fetchSaved(), fetchReviews()]).then(([saved, reviews]) =>{
      console.log(reviews)
      setLatestData({...latestData, Saved:saved, Reviews:reviews})


  }).catch(err => {
    console.error(err);
  });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);


  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "scroll",
        px: 2,
        py: 2,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container
          sx={{
            overflow: "scroll",

            height: "100%",

            borderRadius: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <UserInfo user={user} />

          {/* Tabs */}

          <TabMenu
            tabValue={tabValue}
            theme={theme}
            handleTabChange={handleTabChange}
          />

          {tabValue === "Saved" && (
            <Grid container spacing={2} sx={{ padding: 2 }}>
              {latestData?.Saved?.map((recipe) => (

                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardHeader
                      component={Link}
                      to={`/recipe/${recipe.id}`}
                      title={recipe.name}
                      sx={{ textAlign: "center" }}
                    />
                    <CardMedia
                      component="img"
                      image={recipe.imageurl}
                      sx={{ height: "200px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {recipe.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === "Reviews" && (
            <Box sx = {{display:'flex', flexDirection:'column', gap:2, mt:4}}>
              {latestData?.Reviews?.map((review) => (
               
                
                  <Card sx={{ height: "100%", width:'100%'}}>
                    <CardContent>
                      <Typography sx = {{display:'block'}}component={Link} to = {`/recipe/:${review.recipe_id}`} >  {review.name} </Typography>
                      <Rating
                      name = 'read-only'
                      value = {review.rating}
                      readOnly
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx= {{mt:1}}
                      >
                        {review.review}
                      </Typography>
                    </CardContent>
                  </Card>
                
               
              ))}
            </Box>
          )}
        </Container>
      )}
    </Box>
  );
};

export default ProfilePage;
