import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useEffect, useState } from 'react'
import "../App.css"
import AuthContext from '../auth';

function SignUpPage() {

    const { store } = useContext(GlobalStoreContext)
    const { auth } = useContext(AuthContext)
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [ email, setEmail] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleRegister() {
        let userData = {
            username: username,
            email: email,
            password:password,
            passwordVerify:password
        }
        auth.registerUser(userData)
        store.setPage("/")
    }

    return (
        <Box className="login-page">
            <Box className="vertical-list">
                <TextField label="username" onChange={handleUsernameChange} value = {username}></TextField>
                <TextField label="email" onChange={handleEmailChange} value = {email}></TextField>
                <TextField label="password" onChange={handlePasswordChange} value={password}></TextField>
                <Button variant="contained" onClick={handleRegister}>Sign Up</Button>
            </Box>

        </Box>
    )

}

export default SignUpPage;