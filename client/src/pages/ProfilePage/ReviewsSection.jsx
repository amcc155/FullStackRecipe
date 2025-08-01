import { Box, Card, Rating, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const ReviewsSection = ({ latestData }) => {
  console.log(latestData);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {latestData?.map((review) => (
        <Card key={review.id} sx={{ height: "100%", width: "100%" }}>
          <CardContent>
            <Typography
              sx={{ display: "block" }}
              component={Link}
              to={`/recipe/${review.recipeId}`}
            >
              {review.name}
            </Typography>
            <Rating name="read-only" value={review.rating} readOnly />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ mt: 1 }}
            >
              {review.review}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewsSection;
