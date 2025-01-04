import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import { useState } from "react";

const Login = () => {
    const[loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e)=>{
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
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
        <>
        <Grid container spacing={2}> {/* Grid container with spacing between items */}
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input onChange={handleInputChange} id='username' name = 'username' aria-describedby='username-helper-text' />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input onChange={handleInputChange} id='password' name = 'password' type = 'password' />
                </FormControl>
            </Grid>
        </Grid>

        <button onClick={Signup}> Signup </button>

        <p> {loginInfo.username} </p>
        </>
    );
};

export default Login;
