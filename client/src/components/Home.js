import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';

function Home() {

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)

    return (
      <Box className="Home">

      </Box>
    );
  }
  
  export default Home;