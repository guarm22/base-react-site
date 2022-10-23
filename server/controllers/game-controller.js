const Game = require("../model/game-model")

createGame = async(req, res) => {
    try{
        const { creator, questions, title } = req.body;

        const newGame = new Game({
            title, creator, questions, 
        });
        const savedGame = await newGame.save();

        await res.cookie({
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            game: {
                questions:questions,
                creator:creator,
                title:title
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

getGamesByUser = async(req, res) => {
    const{ username } = req.body
    console.log(req.body)
    await Game.find({creator: username}, function(err, game) {
        return res.status(200).json({
            success:true,
            games:game
        })
    }).catch(err => console.log(err))
}

getGame = async (req,res) => {
    console.log('TODO')
}

module.exports = {
    getGame,
    getGamesByUser,
    createGame,
}