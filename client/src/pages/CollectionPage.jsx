import { Container, Typography, Snackbar, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import RecipeGridLayout from "../layouts/RecipeGridLayout";
import { useState } from "react";

const CollectionPage = () => {
  const { id: collectionId } = useParams();
  const [searchParams] = useSearchParams();
  const collectionName = searchParams.get("collectionName");

  // Snackbar state for error handling
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorToastClose = () => {
    setIsErrorToastOpen(false);
  };

  const getCollectionRecipes = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/collections/${collectionId}/recipes`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.recipes;
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["collectionRecipes", collectionId],
    queryFn: getCollectionRecipes,
    onError: (err) => {
      setErrorMessage(
        err.response?.data?.error ||
          "Failed to fetch recipes. Please try again."
      );
      setIsErrorToastOpen(true);
    },
  });

  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      <Typography variant={"h1"}>
        Recipes in {collectionName} Collection
      </Typography>
      <RecipeGridLayout data={data} />

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
    </Container>
  );
};

export default CollectionPage;
