import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import TabMenu from "./TabMenu";
import SavedSection from "./SavedSection";
import ReviewsSection from "./ReviewsSection";
import CollectionsSections from "./CollectionsSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("Saved");

  // Fetch saved recipes
  const {
    data: savedRecipes,
    isLoading: isLoadingSaved,
    isError,
  } = useQuery({
    queryKey: ["savedRecipes", user?.id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/recipes/saved`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data.recipes;
    },
    enabled: !!user, // Only fetch if the user is logged in
  });

  // Fetch user reviews
  const { data: userReviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["userReviews", user?.id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${user.id}/reviews`
      );
      return response.data.reviews;
    },
    enabled: !!user, // Only fetch if the user is logged in
  });

  // Fetch user collections
  const { data: userCollections, isLoading: isLoadingCollections } = useQuery({
    queryKey: ["userCollections", user?.id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/collections?withImage=true`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data.collections;
    },
    enabled: !!user, // Only fetch if the user is logged in
  });

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
            <SavedSection latestData={savedRecipes || []} />
          )}
          {tabValue === "Reviews" && (
            <ReviewsSection latestData={userReviews || []} />
          )}
          {tabValue === "Collections" && (
            <CollectionsSections latestData={userCollections || []} />
          )}
        </Container>
      )}
    </Box>
  );
};

export default ProfilePage;
