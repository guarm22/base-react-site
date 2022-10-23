import '../App.css';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';

function Banner() {
    const {auth} = useContext(AuthContext)

    function handleLogout() {
        auth.logoutUser();
    }

    let loginButton = true ? <Link to="/login">Login</Link> :
    <Box></Box>
    let signUpButton = true ? <Link to="/signup">Sign Up</Link> :
    <Box></Box>

    let accBox = <Box marginRight="10px">{loginButton}    {signUpButton}</Box>


    if(auth.loggedIn) {
        accBox = <Box className="horizontal-list">
                    <Box paddingRight="10px">{auth.user.username}</Box>
                    <Button variant="contained"  onClick={handleLogout}>Log out</Button>
                </Box>
    }
    

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Box className="banner">

            <Link to="/">Gameshow</Link>    
            {accBox}        
            </Box>
        </Box>
    );
  }

  export default Banner;
