import { createContext, useContext, useState } from 'react'
import api, { getGamesByUser } from '../api'
import DBManager from '../db/DBManager';
import AuthContext from '../auth'
import { useNavigate } from 'react-router-dom';

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_CURRENT_GAME: "CHANGE_CURRENT_GAME",
    GET_GAMES_BY_USER: "GET_GAMES_BY_USER",
    SET_PAGE: "SET_PAGE",
}

function GlobalStoreContextProvider(props) {
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()

    const storeReducer = (action) => {
        const {type, payload} = action
        switch(type) {
            case GlobalStoreActionType.CHANGE_CURRENT_GAME: {
                console.log(payload.currentGame)
                return setStore({
                    currentGame: payload.currentGame,
                    games: store.games,
                    page: store.page
                })
            }

            case GlobalStoreActionType.GET_GAMES_BY_USER: {
                return setStore({
                    currentGame: store.currentGame,
                    games: payload.games,
                    page: store.page
                })
            }
            case GlobalStoreActionType.SET_PAGE: {
                return setStore({
                    currentGame: store.currentGame,
                    games: store.games,
                    page: payload.page
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
        page: "/"
    });

    store.setPage = function(page) {
        storeReducer({
            type:GlobalStoreActionType.SET_PAGE,
            payload: {page: page}
        })
    }

    store.getGamesByUser = async function() {
        if(!auth.user) {
            return
        }
        const response = await api.getGamesByUser({username: auth.user.username})
        
        if(response.data.success) {
            let games = response.data.games
            storeReducer({
                type:GlobalStoreActionType.GET_GAMES_BY_USER,
                payload: {games: games}
            })
        }
    }

    store.editGame = async function(savedGame) {
        if(!auth.user) {
            return
        }

        const response = await api.saveGame(savedGame)

        if(response.data.success) {
            navigate('/',{})
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

    store.deleteGame = async function(id) {
        if(!auth.user) {
            return
        }

        const response = await api.deleteGame(id);
        if(response.data.success) {
            getGamesByUser()
            return true;
        } 
    }

    let db = new DBManager();

    store.setCurrentGame = function(newGame) {

        for(let i=0; i<store.games.length; i++) {
            if(store.games[i]['_id'] == newGame) {
                storeReducer({
                    type:GlobalStoreActionType.CHANGE_CURRENT_GAME,
                    payload: {currentGame: store.games[i]}
                })
                navigate('/create',{})
                return
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