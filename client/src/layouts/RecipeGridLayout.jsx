import { Container, Typography, Grid, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
const RecipeGridLayout = ({ data, title }) => {
  return (
    <Container sx={{ mt: 2 }}>
      <Typography sx={{ mb: 2 }} variant="h2">
        {title}
      </Typography>
      <Grid container spacing={3}>
        {data?.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <Tooltip title={recipe.title}>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {recipe.title}
                  </Typography>
                </Tooltip>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default RecipeGridLayout;
