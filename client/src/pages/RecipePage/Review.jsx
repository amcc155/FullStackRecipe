import { Typography, TextField, Box, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Review = () => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [inputValue, setInputValue] = useState({
    rating: 0,
    review: "",
  });

  const { id: recipeId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/reviews`,
        {
          review: inputValue.review,
          rating: inputValue.rating,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setReviews([...reviews, response.data.review]);
      console.log(response.data.review);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/recipes/${recipeId}/reviews`
        );
        setReviews(response.data.reviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [recipeId]);

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h2"> Reviews </Typography>
      {!user ? (
        <Typography> Please login to write a review </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2, mb: 2 }}
          >
            <label> Rating </label>
            <Rating
              name="simple-controlled"
              value={inputValue.rating}
              onChange={(event, newValue) => {
                setInputValue({ ...inputValue, rating: newValue });
              }}
            />
          </Box>
          <TextField
            onChange={(e) =>
              setInputValue({ ...inputValue, review: e.target.value })
            }
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write a review"
            value={inputValue.review}
            fullWidth
          />
          <button type="submit"> Submit </button>
        </form>
      )}

      {/* Start of the reviews */}
      {reviews.map((review, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography variant="h5"> {review.username} </Typography>

          <Rating name="read-only" value={review.rating} readOnly />
          <Typography sx={{ pl: 2 }}> {review.review} </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default Review;
