import {
  Grid,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";

const SavedSection = ({ latestData }) => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {latestData?.Saved?.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              component={Link}
              to={`/recipe/${recipe.id}`}
              title={recipe.name}
              sx={{ textAlign: "center" }}
            />
            <CardMedia
              component="img"
              image={recipe.imageurl}
              sx={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {recipe.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default SavedSection;
