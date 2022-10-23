import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: '/api',
})

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
export const updateUser = (payload) => api.put(`/user/`, payload)

export const createGame = (payload) => api.post(`/game/`, payload)
export const saveGame = (payload) => api.put(`/game/`, payload)
export const deleteGame = (payload) => api.delete(`/game/`, payload)
export const getGame = (payload) => api.game(`/game/`, payload)
export const getGamesByUser = (payload) => api.post(`/games/`, payload)

const apis= {
    registerUser,
    getLoggedIn,
    loginUser,
    logoutUser,
    updateUser,

    getGamesByUser,
    createGame,
    getGame,
    deleteGame,
    saveGame,
}

export default apis;