import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Snackbar } from "@mui/material";
import Review from "./Review";
import { HashLoader } from "react-spinners";
import ActionButtons from "./ActionButtons";
import { useQuery } from "@tanstack/react-query";

const RecipePage = () => {
  const { id } = useParams();

  const getRecipe = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/recipes/${id}`
    );

    return response.data;
  };

  const { isPending, isError, data } = useQuery({
    queryKey: ["recipe", id],
    queryFn: getRecipe,
    staleTime: Infinity,
    enabled: !!id,
  });

  if (isPending) {
    return (
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
  }

  if (isError) {
    return (
      <Snackbar
        open
        autoHideDuration={5000}
        message="Can not retrieve recipe"
      />
    );
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h2">{data.title}</Typography>
        <ActionButtons recipe={data} />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography>{data.aggregateLikes} Likes</Typography>
        <Typography
          component="a"
          href={data.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Original Source
        </Typography>
      </Box>

      <hr />
      <Typography
        sx={{ mt: 5 }}
        component="div"
        dangerouslySetInnerHTML={{ __html: data.summary }}
      />

      <Box
        component="img"
        src={data.image}
        alt={data.title}
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
  );
};

export default RecipePage;
