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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (test = false) => {
    console.log(test);
    const finalLogInInfo = test
      ? { username: "test", password: "test" }
      : loginInfo;

    try {
      await login(finalLogInInfo);
      navigate("/");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const onClose = () => {
    setLoginError("");
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
        <Typography variant="h4" sx={{}}>
          Login
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
                value={loginInfo.username}
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
                value={loginInfo.password}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* log in and sign up buttons */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin()}
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          color="white"
          onClick={() => handleLogin(true)}
          sx={{ mt: 2 }}
        >
          {" "}
          Login In as Test User{" "}
        </Button>

        <Typography component="p">
          {" "}
          Don't have an account? <Link to="/signup"> Signup </Link>{" "}
        </Typography>
      </Box>
      {loginError && (
        <Snackbar
          open={!!loginError}
          autoHideDuration={2000}
          message={loginError}
          onClose={onClose}
        />
      )}
    </Container>
  );
};

export default Login;
