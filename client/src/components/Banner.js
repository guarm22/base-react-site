import '../App.css';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { Button } from '@mui/material';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';


function Banner() {
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate();
    const {store} = useContext(GlobalStoreContext)

    function handleLogout() {
        auth.logoutUser();
    } 

    function handleButton(page) {
        navigate(page, {})
    }

    let loginButton = <Button variant="contained" onClick={() => handleButton("/login")}>Login</Button>
    let signUpButton = <Button variant="contained" onClick={() => handleButton("/signUp")}>Sign Up</Button>
    let accBox = <Box marginRight="10px">{loginButton} {signUpButton}</Box>

    if(auth.loggedIn) {
        accBox = <Box className="horizontal-list">
                    <Box paddingRight="15px" paddingTop="7px">{auth.user.username}</Box>
                    <Button variant="contained"  onClick={handleLogout}>Log out</Button>
                </Box>
    }
    

    return (
        <Box sx={{ flexGrow: 1 }} >
            <Box className="banner">
            <Button color="inherit" variant="outlined" onClick={() => handleButton("/")}>Website</Button>    
            {accBox}        
            </Box>
        </Box>
    );
  }

  export default Banner;
