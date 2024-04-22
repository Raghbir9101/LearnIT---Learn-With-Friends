import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import HTTP from '../../../HTTP';

const StyledContainer = styled(Container)({
    fontFamily: 'Poppins, sans-serif',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#2c3e50', // Dark teal
    color: '#fff',
});

const StyledButton = styled(Button)({
    marginTop: '20px',
    backgroundColor: '#2ecc71', // Light green
    '&:hover': {
        backgroundColor: '#27ae60', // Darker shade of green on hover
    },
});

function Login() {
    const [userName, setUserName] = useState("");
    const { loginUserName, setLoginUserName, setUserID, setIsAdmin } = useContext(Context)
    const nav = useNavigate();
    const handleSubmit = async () => {
        if (!userName) return alert("Invalid Username !")
        let { data: res } = await HTTP.post("login", { userName })
        nav("/subject")
        setIsAdmin(res.isAdmin)
        setUserID(res._id)
        setLoginUserName(userName || "")
        localStorage.setItem("username", userName);
        localStorage.setItem("userID", res._id);
    }
    if (loginUserName) return <Navigate to={"/subjects"} />
    return (
        <Container maxWidth="xs">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <StyledContainer>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', letterSpacing: '1px' }}>Welcome Learner</h2>
                        <TextField
                            label="Username"
                            variant="filled"
                            fullWidth
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <StyledButton onClick={handleSubmit} variant="contained" fullWidth>
                            Login
                        </StyledButton>
                    </StyledContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
