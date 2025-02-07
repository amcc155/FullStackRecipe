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
  const [latestData, setLatestData] = useState({ recipes: [], reviews: [] });
  const [tabValue, setTabValue] = useState("Saved");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/recipes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data);
        setLatestData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        maxHeight: "100%",
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
              {latestData?.recipes?.map((recipe) => (
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
            <Grid container spacing={2} sx={{ padding: 2 }}>
              {latestData?.reviews?.map((review) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={review.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {review.review}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </Box>
  );
};

export default ProfilePage;
