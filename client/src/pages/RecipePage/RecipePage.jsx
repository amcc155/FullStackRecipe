import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import Review from "./Review";
import { HashLoader } from "react-spinners";
import ActionButtons from "./ActionButtons";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/recipes/${id}`
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

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
        <ActionButtons recipe={recipe} />
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
