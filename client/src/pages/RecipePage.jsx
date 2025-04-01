import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from "../components/Review";
import { HashLoader } from "react-spinners";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const [userRecipes, setUserRecipes] = useState(new Set());
  const[userLikedRecipes, setUserLikedRecipes] = useState(new Set());
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/recipes/${id}`
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    getUserSavedRecipes();
    getUserLikedRecipes();
  }, [id]);

  const handleBookmarkClick = async () => {
    console.log("Bookmark clicked");
   await axios.post(
      "http://localhost:3001/user/recipes",
      {
        recipeId: recipe.id,
        name: recipe.title,
        url: recipe.image,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };


  const handleLikeClick = async ()=>{
    try{
        await axios.post(
            'http://localhost:3001/user/likedRecipes',
            {
                recipeId: recipe.id
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }
        )
    }catch(err){
        console.error(err)
    }

  }
  const getUserSavedRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserRecipes(new Set(response.data.recipes.map((recipe) => recipe.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const getUserLikedRecipes = async () => { 
    try {
      const response = await axios.get("http://localhost:3001/user/likedRecipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserLikedRecipes(new Set(response.data.recipes.map((recipe) => recipe.id)));
    } catch (err) {
      console.error(err);
    }
  };

  return recipe.title ? (
    <Container sx={{ mt: 4 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h2"> {recipe.title} </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {userRecipes.has(recipe.id) ?(
                <BookmarkAddedIcon
                onClick={handleBookmarkClick}
                fontSize="large" />
            ) : (
                <BookmarkBorderIcon
                onClick={handleBookmarkClick}
                fontSize="large"
              />
            )
          }

          <FavoriteIcon onClick = {handleLikeClick} fill = {userLikedRecipes.has(recipe.id)? 'red' : ''} fontSize="large" sx={{ ml: 2, color: userLikedRecipes.has(recipe.id)? 'red': 'gray' }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography> {recipe.aggregateLikes} Likes </Typography>
        <Typography
          component={"a"}
          href={recipe.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {" "}
          Original Source{" "}
        </Typography>
      </Box>

      <hr></hr>
      <Typography
        sx={{ mt: 5 }}
        component={"div"}
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <Box
        component={"img"}
        src={recipe.image}
        alt={recipe.title}
        sx={{
          mt: 5,
          width: "100%",
          height: "auto",
          mx: "auto",
          display: "block",
        }}
      />

      <Review />
    </Container>
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
  );
};

export default RecipePage;
