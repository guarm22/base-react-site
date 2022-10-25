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
    await Game.find({creator: username}, function(err, games) {
        return res.status(200).json({
            success:true,
            games:games
        })
    }).catch(err => console.log(err))
}

saveGame = async(req, res) => {
    const { _id, questions, creator, title } = req.body

    await Game.findOneAndUpdate({_id: _id}, {
        _id: _id,
        questions: questions,
        creator: creator,
        title: title
    }, function (err, docs) {
        if(err) {

        }
        else {
            return res.status(200).json({
                success:true,
                game:docs
            })
        }
    })
}

getGame = async (req,res) => {
    console.log('TODO')
}

deleteGame = async(req,res) => {
    const {_id} = req.body
    console.log(_id)
    await Game.deleteOne({_id: _id}, function(err) {
        return res.status(200).json({
            success: true,
            deleted: true
        })
    }).catch(err => console.log(err));
}

module.exports = {
    getGame,
    getGamesByUser,
    createGame,
    deleteGame,
    saveGame
}