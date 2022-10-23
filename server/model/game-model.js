const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const GameSchema = new Schema(
    {
        creator: {type: String, required: true},
        questions: { type: [Object], required: true },
        title: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Game', GameSchema)
