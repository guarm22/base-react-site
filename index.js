// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listsRouter = require(__dirname +'/server/routes/gameshow-router.js')
app.use('/api', top5listsRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require(__dirname +'/server/db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.NODE_ENV === 'production') {

    const path = require('path');
    // Exprees will serve up production assets
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.use(express.static('client'));
  
    // Express serve up index.html file if it doesn't recognize route
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


