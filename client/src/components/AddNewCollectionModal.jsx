import {
  Container,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const AddNewCollectionModal = ({ handleClose, isModalOpen }) => {
  const [collectionName, setCollectionName] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleAddCollection = async (e) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/collections`,
      {
        collectionName,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    handleClose();
  };

  const mutation = useMutation({
    mutationFn: handleAddCollection,
    onSuccess: () => queryClient.invalidateQueries(["collections", user.id]),
    onError: (err) => {
      console.error();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          bgcolor: "white",
          padding: "2rem",
        }}
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          onSubmit={handleSubmit}
        >
          <Typography sx={{}} variant="h2">
            {" "}
            Create Collection{" "}
          </Typography>

          <TextField
            onChange={(e) => setCollectionName(e.target.value)}
            id="name"
            label="name"
            type="text"
            placeholder="name"
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ flex: 1, backgroundColor: "white", color: "black" }}
            >
              {" "}
              Cancel{" "}
            </Button>
            <Button variant="contained" sx={{ flex: 1 }} type="submit">
              {" "}
              Add{" "}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddNewCollectionModal;
