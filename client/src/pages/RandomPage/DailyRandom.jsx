import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Stack, Typography, Grid2 } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import SideBar from "./SideBar.jsx";
import { HashLoader } from "react-spinners";
import RecipeGridLayout from "../../layouts/RecipeGridLayout.jsx";

const DailyRandom = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem("randomRecipes");
    const latestFetch = localStorage.getItem("latestFetch");

    if (recipes && latestFetch) {
      const now = new Date();
      const lastFetchDate = new Date(latestFetch);
      const hoursDiff = (now - lastFetchDate) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        setRandomRecipes(JSON.parse(recipes));
        return;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/random/recipes`
        );
        localStorage.setItem(
          "randomRecipes",
          JSON.stringify(response.data.recipes)
        );
        localStorage.setItem("latestFetch", new Date());
        setRandomRecipes(response.data.recipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {randomRecipes.length > 0 ? (
        <RecipeGridLayout data={randomRecipes} title={"Daily Randoms"} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <HashLoader color="#FFA500" size={50} />
        </Box>
      )}
    </>
  );
};

export default DailyRandom;
