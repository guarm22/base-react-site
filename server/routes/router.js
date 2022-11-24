const auth = require('../auth')
const express = require('express')
const UserController = require('../controllers/user-controller')
const GameController = require('../controllers/game-controller')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)

module.exports = router