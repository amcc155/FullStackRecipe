import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Box, Typography, Button, ButtonGroup } from "@mui/material";
import SearchModal from "../components/AdvancedSearch/SearchModal";
const HomePage = () => {
  const [isSearching, setIsSearching] = useState(false);
  
  const { user } = useAuth();
  const userName = user ? user.username : 'Guest'

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage: "url(/Gemini_bg_image3.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          maxWidth: "100%",
          justifyContent: "center",
          px: 5,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "950px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "white", wordBreak: "break-word" }}
          >
            {" "}
            Welcome {userName}{" "}
          </Typography>
          <Typography sx={{ color: "white" }} variant="h1">
            {" "}
            Search Over 300,000 Recipes{" "}
          </Typography>
          <Typography variant="body1">
            Start finding recipes faster and easier{" "}
          </Typography>
          <ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="group of buttons"
          >
            <Button component={Link} to="/random/daily">
              Daily Randoms
            </Button>
            <Button component={Link} to="/advanced/search">
              Start Searching
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Start of featured REcipes component */}
      {/* <Typography variant = 'h5'> Some foods you may like </Typography> */}
    </>
  );
};
export default HomePage;
