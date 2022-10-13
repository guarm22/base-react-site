// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

console.log("\n\nNEW SERVER\n")

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));



// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listsRouter = require('./routes/gameshow-router.js')
app.use('/api', top5listsRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


    const path = require('path');
    // Exprees will serve up production assets
    app.use(express.static(path.join("..", "client", "build")));
    app.use(express.static('client'));

    console.log(path.resolve('..', 'client', 'build', 'index.html') + "\n")
  
    // Express serve up index.html file if it doesn't recognize route
    app.get('/*', (req, res) => {
      res.sendFile(('app/client/build/index.html'));
    });
  

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


