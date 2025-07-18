import { Box, Snackbar, Alert } from "@mui/material";
import AddRecipeToCollectionModal from "./AddRecipeToCollectionModal";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ActionButtons = ({ recipe }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const addCollectionButtonRef = useRef();

  // Snackbar state for error handling
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const handleErrorToastClose = () => {
    setIsErrorToastOpen(false);
  };

  // Fetch user saved recipes
  const { data: userRecipes, isLoading: isLoadingSavedRecipes } = useQuery({
    queryKey: ["savedRecipes", user?.id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/recipes/saved`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return {
        recipesSet: new Set(response.data?.recipes?.map((recipe) => recipe.id)),
        recipes: response.data.recipes,
      };
    },
  });

  // Fetch user liked recipes
  const { data: userLikedRecipes, isLoading: isLoadingLikedRecipes } = useQuery(
    {
      queryKey: ["likedRecipes", user?.id],
      queryFn: async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${user.id}/liked`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return {
          recipes: response.data.recipes,
          recipesSet: new Set(response.data.recipes.map((recipe) => recipe.id)),
        };
      },
    }
  );

  // Mutation to save a recipe
  const saveRecipeMutation = useMutation({
    mutationFn: async () => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["savedRecipes", user?.id]);
    },
    onError: (error) => {
      console.error("Failed to save recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again.");
      setIsErrorToastOpen(true);
    },
  });

  //remove recipe from saved
  const removeSavedRecipeMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/saved`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    onError: (error) => {
      console.error(error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["savedRecipes", user?.id]);
    },
  });

  // Mutation to like a recipe
  const likeRecipeMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/liked`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likedRecipes", user?.id]);
    },
    onError: (error) => {
      console.error("Failed to like recipe:", error);
      setErrorMessage("Failed to like recipe. Please try again.");
      setIsErrorToastOpen(true);
    },
  });

  //remove recipe from liked
  const removeLikedRecipeMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/recipes/${recipe.id}/liked`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likedRecipes", user?.id]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddCollectionClick = (e) => {
    e.stopPropagation();
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
      <AddRecipeToCollectionModal
        isOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        recipe={recipe}
      />
      <AddCircleOutlineIcon
        sx={{ cursor: "pointer" }}
        ref={addCollectionButtonRef}
        onClick={handleAddCollectionClick}
        fontSize="large"
      />
      {userRecipes?.recipesSet?.has(recipe.id) ? (
        <BookmarkAddedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => removeSavedRecipeMutation.mutate()}
          fontSize="large"
        />
      ) : (
        <BookmarkBorderIcon
          sx={{ cursor: "pointer" }}
          onClick={() => saveRecipeMutation.mutate()}
          fontSize="large"
        />
      )}

      <FavoriteIcon
        onClick={
          userLikedRecipes?.recipesSet?.has(recipe.id)
            ? () => removeLikedRecipeMutation.mutate()
            : () => likeRecipeMutation.mutate()
        }
        fontSize="large"
        sx={{
          cursor: "pointer",
          color: userLikedRecipes?.recipesSet?.has(recipe.id) ? "red" : "gray",
        }}
      />

      {/* Snackbar for error toast notifications */}
      <Snackbar
        open={isErrorToastOpen}
        autoHideDuration={3000}
        onClose={handleErrorToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleErrorToastClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ActionButtons;
