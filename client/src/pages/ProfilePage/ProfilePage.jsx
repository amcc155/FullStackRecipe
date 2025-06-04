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
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "./UserInfo";
import TabMenu from "./TabMenu";
import AddNewCollectionModal from "../../components/AddNewCollectionModal";
import ReviewsSection from "./ReviewsSection";
import CollectionsSections from "./CollectionsSection";
import SavedSection from "./SavedSection";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  console.log(user);
  const theme = useTheme();
  const navigate = useNavigate();
  const [latestData, setLatestData] = useState({
    Saved: [],
    Reviews: [],
    Collections: [],
  });
  const [tabValue, setTabValue] = useState("Saved");

  const fetchReviews = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/reviews`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => response.data.reviews);

  const fetchSaved = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/recipes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        return response.data.recipes;
      });

  const fetchCollections = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/collections?withImage=true`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => response.data.collections);

  useEffect(() => {
    if (user) {
      Promise.allSettled([fetchSaved(), fetchReviews(), fetchCollections()])
        .then(([saved, reviews, collections]) => {
          console.log(saved);
          setLatestData({
            ...latestData,
            Saved: saved.status === "fulfilled" ? saved.value : null,
            Reviews: reviews.status === "fulfilled" ? reviews.value : null,
            Collections:
              collections.status === "fulfilled" ? collections.value : null,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

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

          {tabValue === "Saved" && <SavedSection latestData={latestData} />}

          {tabValue === "Reviews" && <ReviewsSection latestData={latestData} />}

          {tabValue === "Collections" && (
            <CollectionsSections
              latestData={latestData}
              setLatestData={setLatestData}
            />
          )}
        </Container>
      )}
    </Box>
  );
};

export default ProfilePage;
