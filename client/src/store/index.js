import { createContext, useContext, useState } from 'react'
import api from '../api'
import DBManager from '../db/DBManager';
import AuthContext from '../auth'
import { useNavigate } from 'react-router-dom';

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_CURRENT_GAME: "CHANGE_CURRENT_GAME",
    GET_GAMES_BY_USER: "GET_GAMES_BY_USER"
}

function GlobalStoreContextProvider(props) {
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()

    const storeReducer = (action) => {
        const {type, payload} = action

        switch(type) {
            case GlobalStoreActionType.CHANGE_CURRENT_GAME: {
                return setStore({
                    currentGame: payload.currentGame,
                    games: store.games,
                })
            }

            case GlobalStoreActionType.GET_GAMES_BY_USER: {
                return setStore({
                    currentGame: null,
                    games: payload.games,
                })
            }

            default:
                return store;
        }
    }

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentGame: null,
        games: null,
    });

    store.getGamesByUser = async function() {
        if(!auth.user) {
            return
        }
        const response = await api.getGamesByUser({username: auth.user.username})
        
        if(response.data.success) {
            let games = response.data.games
            console.log(games)
            storeReducer({
                type:GlobalStoreActionType.GET_GAMES_BY_USER,
                payload: {games: games}
            })
        }
    }

    store.createNewGame = async function(game) {
        if(!auth.user) {
            return
        }
        const response = await api.createGame(game)
        if(response.data.success) {
            navigate('/',{})
        }
    }

    let db = new DBManager();

    store.saveGame = function(game) {
        db.mutationCreateGame(game);
    }

    store.setCurrentGame = function(newGame) {
        console.log(newGame)

        for(let i=0; i<store.games.length; i++) {
            if(store.games[i]['_id'] == newGame) {
                storeReducer({
                    type:GlobalStoreActionType.CHANGE_CURRENT_GAME,
                    payload: {currentGame: store.games[i]}
                })
            }
        }
    }
    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };