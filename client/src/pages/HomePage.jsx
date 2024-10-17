import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Box, Typography, Button, ButtonGroup } from "@mui/material";
import SearchModal from "../components/SearchModal";
const HomePage = () => {
    const[isSearching, setIsSearching] = useState(false)
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h3"> Welcome Name </Typography>
          <Typography  variant="p">
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
            <Button component = {Link} to = "/advanced/search">
                Start Searching
                </Button>
          </ButtonGroup>
        </Box>

          {/* Start of featured REcipes component */}
          {/* <Typography variant = 'h5'> Some foods you may like </Typography> */}
       
      </Container>
      
    </>
  );
};
export default HomePage;
