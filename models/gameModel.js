import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const GameSchema = new Schema(
    {
        gameID : {type: Number, required: true},
        name : {type: String, required: true},
        gameType : {type: String, required: true},
        releaseYear : {type: Number, required: true},
        gameDesc : {type: String, required: true},
    },
    {toJSON: {virtuals: true}})

    GameSchema.virtual('uri').get(function(){
        return `/games/${this._id}`;
    });

    let Game = mongoose.model('Game', GameSchema);

    export {Game}