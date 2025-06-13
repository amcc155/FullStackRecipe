import { Box } from "@mui/material";
import AddRecipeToCollectionModal from "./AddRecipeToCollectionModal";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const ActionButtons = ({ recipe }) => {
  const [userRecipes, setUserRecipes] = useState(new Set());
  const [userLikedRecipes, setUserLikedRecipes] = useState(new Set());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const addCollectionButtonRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    getUserSavedRecipes();
    getUserLikedRecipes();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        e.target &&
        addCollectionButtonRef.current &&
        !addCollectionButtonRef.current.contains(e.target)
      ) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen === false) {
      window.removeEventListener("click", handleOutsideClick);
    } else {
      window.addEventListener("click", handleOutsideClick);
    }
  }, [isPopupOpen]);

  const handleBookmarkClick = async () => {
    console.log("Bookmark clicked");
    await axios.post(
      `${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/saved`,
      {
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

  const handleLikeClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/liked`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getUserSavedRecipes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/recipes/saved`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserRecipes(new Set(response.data.recipes.map((recipe) => recipe.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const getUserLikedRecipes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${user.id}/liked`,
        {}
      );
      setUserLikedRecipes(
        new Set(response.data.recipes.map((recipe) => recipe.id))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCollectionClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        position: "relative",
      }}
    >
      <AddRecipeToCollectionModal isOpen={isPopupOpen} recipe={recipe} />
      <AddCircleOutlineIcon
        sx={{ cursor: "pointer" }}
        ref={addCollectionButtonRef}
        onClick={handleAddCollectionClick}
        fontSize="large"
      />
      {userRecipes.has(recipe.id) ? (
        <BookmarkAddedIcon
          sx={{ cursor: "pointer" }}
          onClick={handleBookmarkClick}
          fontSize="large"
        />
      ) : (
        <BookmarkBorderIcon
          sx={{ cursor: "pointer" }}
          onClick={handleBookmarkClick}
          fontSize="large"
        />
      )}

      <FavoriteIcon
        onClick={handleLikeClick}
        fill={userLikedRecipes.has(recipe.id) ? "red" : ""}
        fontSize="large"
        sx={{
          cursor: "pointer",
          color: userLikedRecipes.has(recipe.id) ? "red" : "gray",
        }}
      />
    </Box>
  );
};

export default ActionButtons;
