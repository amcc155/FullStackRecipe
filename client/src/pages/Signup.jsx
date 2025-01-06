import { FormControl, InputLabel, Input, Grid, Button, Container, Typography, Box } from "@mui/material";
import { useState } from "react";

const Signup = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    }

    const Signup = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

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
                <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='username'>Username</InputLabel>
                            <Input onChange={handleInputChange} id='username' name='username' aria-describedby='username-helper-text' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <Input onChange={handleInputChange} id='password' name='password' type='password' />
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
            </Box>
        </Container>
    );
};

export default Signup;
