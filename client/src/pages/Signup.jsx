import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSnackBarClose = () => {
    setErrorMessage("");
  };

  const Signup = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      //handle http errors
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error || "Request Failed");
      }
      const data = await response.json();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Signup
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                onChange={handleInputChange}
                id="username"
                name="username"
                aria-describedby="username-helper-text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={handleInputChange}
                id="password"
                name="password"
                type="password"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={Signup}
          sx={{ mt: 2 }}
        >
          Signup
        </Button>
        <Typography component={"p"}>
          {" "}
          Already have an account? <Link to="/login"> Login </Link>{" "}
        </Typography>

        {errorMessage && (
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={2000}
            message={errorMessage}
            onClose={handleSnackBarClose}
          />
        )}
      </Box>
    </Container>
  );
};

export default Signup;
