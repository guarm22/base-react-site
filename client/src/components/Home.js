import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';

function Home() {

    const { store } = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()
    const [reset, setReset] = useState(0);

    useEffect(() => {
      store.getGamesByUser();
  }, []);

    let gamesList = [];
    let titles = [];
    let ids = [];

    if(store && store.games) {
      for(let i=0; i<store.games.length; i++) {
        gamesList[i] = 
        <Box key={i} className="home-list-item">
          <Box  onClick={ () => handleGameSelect(i)}> {store.games[i]['title']} </Box>

          <Box className='home-button-holder'>
            <Button variant="contained" color="primary" onClick={() => handleEdit(i)}>edit</Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(store.games[i]['title'])}>delete</Button>
          </Box>

        </Box>
        titles[i] = store.games[i]['title'];
        ids[i] = store.games[i]['_id']
      }
    }

    function handleReset () {
      store.setCurrentGame("");
    }

    function handleGameSelect(i) {
      store.setCurrentGame(ids[i]);
      navigate('/play',{})
    }

    function handleDelete(title) {
      store.deleteGame(title);
      setReset(reset+1);
    }

    function handleEdit(i) {
      if(!auth.loggedIn){
        alert("Please log in")
        return
      }

      store.setCurrentGame(ids[i]);
      navigate('/create',{})
    }

    function handleCreate() {
      if(!auth.loggedIn){
        alert("Please log in")
        return
      }
      alert("WARNING: \nthis version of website is only saving gameshows locally! \nfuture versions will save gameshows online!\nyour local gameshows will NOT be carried over")
      navigate('/create', {}); 
    }


    return (
      <Box className="Home">

        <Box className='home-button-holder'>
          <Button onClick={handleCreate} to="/create" variant="contained" color="primary">
              Create New Gameshow
          </Button>

          <Button onClick={handleReset} variant="contained" color="error">
              Reset Current Game
          </Button>
        </Box>

        <Box className='home-list'>{gamesList}</Box>       

      </Box>
    );
  }
  
  export default Home;