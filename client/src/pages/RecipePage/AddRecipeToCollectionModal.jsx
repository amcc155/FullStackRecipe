import {
  Typography,
  Box,
  CardContent,
  Card,
  Button,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const AddRecipeToCollectionModal = ({ isOpen, recipe }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCollections = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/collections`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.collections;
  };

  const {
    data: collections,
    isPending,
    isError,
  } = useQuery({
    queryFn: fetchCollections,
    staleTime: Infinity,
    queryKey: ["collections", user?.id],
  });

  const mutation = useMutation({
    mutationFn: (newCollectionItem) => {
      return axios.post(
        `${process.env.REACT_APP_API_URL}/collections/recipe`,
        newCollectionItem,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["collections", user?.id]);
      setSuccessMessage("Recipe added successfully!");
    },
    onError: () => {
      setErrorMessage("Failed to add recipe to collection.");
    },
  });

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            pt: 1,
            boxSizing: "border-box",
            gridGap: 10,
            width: 300,
            overflow: "scroll",
            height: 450,
            backgroundColor: "white",
            position: "absolute",
            right: 100,
            top: 2,
            border: "2px solid orange",
          }}
        >
          {collections.map((collection, index) => (
            <Box
              key={collection.id}
              sx={{
                position: "relative",
                width: "100%",
                height: "auto",
                aspectRatio: "1",
                pb: 2,
              }}
            >
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardContent sx={{ padding: 0, margin: 0 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    {collection.previewimages?.map((image) => (
                      <CardMedia
                        key={uuidv4()}
                        sx={{ width: "100%", height: "100%" }}
                        component="img"
                        src={image}
                      />
                    ))}
                  </Box>
                  <Typography sx={{ textAlign: "center" }}>
                    {collection.name}
                  </Typography>
                </CardContent>
              </Card>

              {/* overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  bgcolor: "white",
                  opacity: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.3s",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Button
                  onClick={() =>
                    mutation.mutate({
                      recipeId: recipe.id,
                      collectionId: collection.id,
                      recipeName: recipe.title,
                      recipeUrl: recipe.image,
                    })
                  }
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ bgcolor: "white", color: "black" }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              backgroundColor: "red",
              width: "100%",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddIcon sx={{ color: "white" }} />
          </Box>
        </Box>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddRecipeToCollectionModal;
