import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid2,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import SideBar from "../components/RandomPage/SideBar";

const DailyRandom = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  useEffect(() => {
    const recipes = localStorage.getItem("randomRecipes");
    const latestFetch = localStorage.getItem("latestFetch");

    if (recipes && latestFetch) {
      const now = new Date();
      const lastFetchDate = new Date(latestFetch);
      const hoursDiff = (now - lastFetchDate) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        setRandomRecipes(JSON.parse(recipes));
        setSelectedRecipe(JSON.parse(recipes)[0]);
        return;
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/random/recipes"
        );
        console.log(response.data.recipes);
        localStorage.setItem(
          "randomRecipes",
          JSON.stringify(response.data.recipes)
        );
        localStorage.setItem("latestFetch", new Date());
        setRandomRecipes(response.data.recipes)
        setSelectedRecipe(response.data.recipes[0])
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleBookmarkClick = () => {
    console.log("Bookmark clicked");
    axios.post("http://localhost:3001/user/recipes", {
      recipeId: selectedRecipe.id,
      name: selectedRecipe.title,
      url: selectedRecipe.image,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  return (
    <>
    {randomRecipes && (

  
      <Box
        sx={{
          display: "flex",
          maxHeight: "calc(100vh-64px)",
        }}
      >
        {/* start of sidebar */}

        <SideBar randomRecipes = {randomRecipes} setSelectedRecipe = {setSelectedRecipe}/>
        
        <Box
          component="main"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
          }}
        >
          <img
            style={{ width: "40%", margin: "0 auto", display: "block" }}
            src={selectedRecipe?.image}
            alt={selectedRecipe?.title || "Recipe Image"}
          />

          <Container
            disableGutters
            maxWidth="xl"
            sx={{
              bgcolor: "#f5f5f5",
              px:5,
              width: "100%",

              minHeight: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={7}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <AccessTimeIcon />
                <Typography>
                  {" "}
                  {`${selectedRecipe?.readyInMinutes} MINUTES`}{" "}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <PeopleOutlineRoundedIcon />
                <Typography>
                  {" "}
                  {`${selectedRecipe?.servings} SERVINGS`}{" "}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} sx={{}}>
              <a
                href={selectedRecipe?.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon />
              </a>
              <BookmarkBorderIcon onClick = {handleBookmarkClick}/>
            </Stack>
          </Container>
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
              flexDirection: "column",
              pt: 2,
              backgroundColor: "#d3d3d3",
            }}
          >
            <Typography
            
              sx={{
                mb: 4,
              }}
              variant="h4"
            >
              {" "}
              Recipe Ingredients{" "}
            </Typography>

            <Grid2
              container
              justifyContent={"space-between"}
              spacing={2}
              sx={{
                width: "60%",
              }}
            >
              {selectedRecipe?.extendedIngredients.map((ingredient) => (
                <Grid2 item size={5}>
                  <Stack direction="row" alignItems="center">
                    <CheckIcon />
                    <Typography color=""> {ingredient.original} </Typography>
                  </Stack>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      </Box>
        )}
    </>
  );
};

export default DailyRandom;
